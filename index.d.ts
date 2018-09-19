import * as moment from 'moment';

declare module 'moment' {
  interface Moment {
    isBusinessDay: (day: Moment | string) => boolean;
    businessDiff: (start: Moment | string, end: Moment | string) => number;
    countBusinessDaysInDaysFromDate: (start: Moment | string, days: number) => number;
  }
}