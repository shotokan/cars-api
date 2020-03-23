import * as moment from 'moment';

const OWNER_BOUTH_CAR_BEFORE_LAST_MONTHS = 18;
const DISCOUNT_BETWEEN_MONTHS_BEFORE: { to: number; from: number } = {
  from: 18,
  to: 12,
};
const DISCOUNT_PERCENT = 0.2;

export class ProcessHelper {
  private currentDate: Date;
  constructor() {
    this.currentDate = new Date();
  }

  getRangeDates() {
    const fromDate: moment.Moment = moment(this.currentDate);
    fromDate.subtract(DISCOUNT_BETWEEN_MONTHS_BEFORE.from, 'months');
    const toDate: moment.Moment = moment(this.currentDate);
    toDate.subtract(DISCOUNT_BETWEEN_MONTHS_BEFORE.to, 'months');
    return {
      fromDate,
      toDate,
    };
  }

  getRangeDateLastMonths(): moment.Moment {
    const beforeDate: moment.Moment = moment(this.currentDate);
    beforeDate.subtract(OWNER_BOUTH_CAR_BEFORE_LAST_MONTHS, 'M');
    return beforeDate;
  }

  getDiscountPercent(): number {
    return DISCOUNT_PERCENT;
  }
}
