import { BadRequestException, Injectable } from '@nestjs/common';
import { RentalRepository } from '../repository/rental.repository';
import { BaseService } from './base.service';
import { forkJoin, map, mergeMap, Observable, tap } from 'rxjs';
import { TariffRepository } from '../repository/tariff.repository';
import { CarRepository } from '../repository/car.repository';
import { DiscountRepository } from '../repository/discount.repository';
import { RentalEntity, RentalEntityWithRelations } from '../entity/rental.entity';
import { TariffEntity } from '../entity/tariff.entity';
import { CarEntity } from '../entity/car.entity';
import { DiscountEntity } from '../entity/discount.entity';
import { DateUtils } from '../common/utils/date.utils';

@Injectable()
export class RentalService extends BaseService<RentalEntity> {
  private static readonly MAX_RENTAL_DAYS_COUNT = 30;
  private static readonly DAYS_COUNT_BETWEEN_RENTAL = 3;

  constructor(
    protected readonly rentalRepository: RentalRepository,
    private readonly tariffRepository: TariffRepository,
    private readonly carRepository: CarRepository,
    private readonly discountRepository: DiscountRepository,
    private readonly dateUtils: DateUtils,
  ) {
    super(rentalRepository);
  }

  rentCar(carId: string, tariffId: string, daysCount: number, startedAt?: string): Observable<any> {
    return this.rentalRepository.findOneByIdCar(carId).pipe(
      tap((rentalEntity) => {
        if (rentalEntity) {
          this.checkPauseBetweenRental(rentalEntity.endedAt, startedAt);
        }
      }),
      mergeMap(() => this.calculateRental(carId, tariffId, daysCount, startedAt)),
      mergeMap((rentalWithRelations) => {
        return this.rentalRepository
          .create({
            carId: rentalWithRelations.car.id,
            tariffId: rentalWithRelations.tariff.id,
            discountId: rentalWithRelations.discount && rentalWithRelations.discount.id,
            daysCount: rentalWithRelations.daysCount,
            totalPrice: rentalWithRelations.totalPrice,
            startedAt: rentalWithRelations.startedAt,
            endedAt: rentalWithRelations.endedAt,
          })
          .pipe(map((rentalEntity) => ({ ...rentalWithRelations, id: rentalEntity.id })));
      }),
    );
  }

  calculateRental(
    carId: string,
    tariffId: string,
    daysCount: number,
    startedAt?: string,
  ): Observable<Omit<RentalEntityWithRelations, 'id'>> {
    this.checkDaysCount(daysCount);

    const startedAtDate = startedAt
      ? this.dateUtils.getDateByStr(startedAt)
      : this.dateUtils.getDateByStr(this.dateUtils.getDateString());
    const endedAtDate = this.dateUtils.addDays(startedAtDate, daysCount - 1);

    this.checkWeekend(startedAtDate, endedAtDate);

    return forkJoin<[CarEntity, TariffEntity, DiscountEntity]>([
      this.getCar(carId),
      this.getTariff(tariffId),
      this.getDiscount(daysCount),
    ]).pipe(
      map(([carEntity, tariffEntity, discountEntity]) => {
        return {
          car: carEntity,
          tariff: tariffEntity,
          discount: discountEntity,
          totalPrice: this.calculateRentalPrice(daysCount, tariffEntity, discountEntity),
          daysCount,
          startedAt: startedAtDate,
          endedAt: endedAtDate,
        };
      }),
    );
  }

  findAllWithRelations(): Observable<RentalEntityWithRelations[]> {
    return this.rentalRepository.findAllWithRelations();
  }

  private getTariff(tariffId: string): Observable<TariffEntity> {
    return this.tariffRepository.findOne(tariffId).pipe(
      tap((tariffEntity) => {
        if (!tariffEntity) {
          throw new Error(`Not found tariff: tariffId=${tariffId}`);
        }
      }),
    );
  }

  private getCar(carId: string): Observable<CarEntity> {
    return this.carRepository.findOne(carId).pipe(
      tap((carEntity) => {
        if (!carEntity) {
          throw new Error(`Not found car: carId=${carId}`);
        }
      }),
    );
  }

  private getDiscount(daysCount: number): Observable<DiscountEntity> {
    return this.discountRepository.findAll().pipe(
      map((discountEntities) => {
        const discount = discountEntities.find(
          (item) => item.fromRentalDaysCount <= daysCount && daysCount <= item.toRentalDaysCount,
        );

        return discount || null;
      }),
    );
  }

  private calculateRentalPrice(daysCount: number, tariffEntity: TariffEntity, discountEntity?: DiscountEntity): number {
    const priceWithoutDiscount = Math.round(daysCount * tariffEntity.price);

    if (!discountEntity) {
      return priceWithoutDiscount;
    }

    const discount = 1 - Math.round((discountEntity.discount / 100) * 100) / 100;

    return Math.round(priceWithoutDiscount * discount);
  }

  private checkDaysCount(daysCount: number): void {
    if (daysCount > RentalService.MAX_RENTAL_DAYS_COUNT) {
      throw new BadRequestException(
        `Forbidden to rent: daysCount=${daysCount}, maxDaysCount=${RentalService.MAX_RENTAL_DAYS_COUNT}`,
      );
    }
  }

  private checkPauseBetweenRental(endedDate: Date, startedDate?: string): void {
    const currentDate = startedDate
      ? this.dateUtils.getDateByStr(startedDate)
      : this.dateUtils.getDateByStr(this.dateUtils.getDateString());

    const daysDifference = this.dateUtils.getDaysDifference(currentDate, endedDate);

    if (daysDifference < RentalService.DAYS_COUNT_BETWEEN_RENTAL) {
      throw new BadRequestException(
        `Car is not available for rent: currentDate=${currentDate.toISOString()}, endedDate=${endedDate.toISOString()}`,
      );
    }
  }

  private checkWeekend(startedDate: Date, endedDate: Date): void {
    if (this.dateUtils.checkWeekend(startedDate)) {
      throw new BadRequestException(`Forbidden to rent a car on weekend: startedAt=${startedDate.toISOString()}`);
    }

    if (this.dateUtils.checkWeekend(endedDate)) {
      throw new BadRequestException(
        `Forbidden to return the rented car on a weekend: endedAt=${endedDate.toISOString()}`,
      );
    }
  }
}
