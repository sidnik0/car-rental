import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RentalService } from '../service/rental.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { RentalDto } from './dto/rental.dto';
import { RentalPropsDto } from './dto/rental-props.dto';
import { map, Observable } from 'rxjs';
import { RentalIdDto } from './dto/rental-id.dto';
import { RentalMapper } from '../mapper/rental.mapper';

@ApiTags('Rentals API')
@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService, private readonly rentalMapper: RentalMapper) {}

  @ApiOperation({
    summary: 'Create rental',
    description: 'Create rental',
  })
  @ApiBody({ type: RentalPropsDto })
  @ApiCreatedResponse({ type: RentalDto })
  @Post()
  rentCar(@Body() rentalPropsDto: RentalPropsDto): Observable<RentalDto> {
    return this.rentalService
      .rentCar(rentalPropsDto.carId, rentalPropsDto.tariffId, rentalPropsDto.daysCount, rentalPropsDto.startedAt)
      .pipe(map((rental) => this.rentalMapper.fromEntityToDto(rental as any)));
  }

  @ApiOperation({
    summary: 'Calculate rental',
    description: 'Calculate rental',
  })
  @ApiOkResponse({ type: RentalDto })
  @Get('calculate')
  calculateRental(@Query() rentalPropsDto: RentalPropsDto): Observable<RentalDto> {
    return this.rentalService
      .calculateRental(rentalPropsDto.carId, rentalPropsDto.tariffId, rentalPropsDto.daysCount)
      .pipe(map((rental) => this.rentalMapper.fromEntityToDto(rental as any)));
  }

  @ApiOperation({
    summary: 'Get all rental',
    description: 'Get all rental',
  })
  @ApiOkResponse({ type: [RentalDto] })
  @Get()
  getAll(): Observable<RentalDto[]> {
    return this.rentalService
      .findAllWithRelations()
      .pipe(map((rentals) => rentals.map((rental) => this.rentalMapper.fromEntityToDto(rental as any))));
  }

  // @ApiOperation({
  //   summary: 'Get rental by id',
  //   description: 'Get rental by id',
  // })
  // @ApiParam({ name: 'rentalId', description: 'Rental id' })
  // @ApiOkResponse({ type: RentalDto })
  // @Get(':rentalId')
  // getOne(@Param() rentalIdDto: RentalIdDto): Observable<RentalDto> {
  //   return this.rentalService.getOne(rentalIdDto.rentalId);
  // }
  //
  // @ApiOperation({
  //   summary: 'Update rental by id',
  //   description: 'Update rental by id',
  // })
  // @ApiParam({ name: 'rentalId', description: 'Rental id' })
  // @ApiBody({ type: RentalPropsDto })
  // @ApiOkResponse({ type: RentalDto })
  // @Put(':rentalId')
  // update(@Param() rentalIdDto: RentalIdDto, @Body() rentalPropsDto: RentalPropsDto): Observable<RentalDto> {
  //   return this.rentalService.update({ ...rentalPropsDto, id: rentalIdDto.rentalId });
  // }
}
