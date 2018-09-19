import * as m from 'moment';

declare function moment(inp?: m.MomentInput, format?: m.MomentFormatSpecification, strict?: boolean): moment.Moment;
declare function moment(inp?: m.MomentInput, format?: m.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment;

declare namespace moment {

  interface Moment{
    isBusinessDay: () => boolean;
    businessDiff: (param: Moment | string) => number;
    countBusinessDaysInDaysFromDate: (days: number) => number;
  }
}


export = moment;
