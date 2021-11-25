import { Injectable } from '@nestjs/common';

@Injectable()
export class DateUtils {
  private static DAY = 86400000;
  private static WEEKEND = [0, 6];

  getCurrentDate(): Date {
    return new Date();
  }

  getDateByStr(str: string): Date {
    return new Date(str);
  }

  getDateString(date = new Date()): string {
    const year = date.getUTCFullYear();
    const month = DateUtils.getCorrectStr(date.getUTCMonth() + 1);
    const day = DateUtils.getCorrectStr(date.getUTCDate());

    return `${year}-${month}-${day}`;
  }

  addDays(currentDate: Date, daysCount: number): Date {
    const date = new Date(currentDate);

    date.setDate(currentDate.getDate() + daysCount);

    return date;
  }

  getDaysDifference(firstDate: Date, secondDate: Date): number {
    return Math.floor((firstDate.getTime() - secondDate.getTime()) / DateUtils.DAY);
  }

  checkWeekend(date: Date): boolean {
    return DateUtils.WEEKEND.includes(date.getUTCDay());
  }

  private static getCorrectStr(number: number): string {
    return `${number < 10 ? `0${number}` : number}`;
  }
}
