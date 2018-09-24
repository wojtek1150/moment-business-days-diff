'use strict';


if (typeof require === 'function') {
  const moment = require('moment');

  const locale = moment().localeData();
  const defaultWorkingWeekdays = [1, 2, 3, 4, 5];
  const workingWeekdays = locale._workingWeekdays || defaultWorkingWeekdays;

  moment.fn.businessDiff = function (param) {
    const d1 = this.clone();
    const d2 = param.clone();
    const start = d1 < d2 ? d1 : d2;
    const end = d2 > d1 ? d2 : d1;

    const startDateMoment = moment(start.format('YYYY-MM-DD'), 'YYYY-MM-DD');
    const endDateMoment = moment(end.format('YYYY-MM-DD'), 'YYYY-MM-DD');

    const stdDiff = endDateMoment.diff(startDateMoment, 'days');
    let numOfDays = 0;

    if (!endDateMoment.isSameOrBefore(startDateMoment)) {
      numOfDays = startDateMoment.countBusinessDaysInDaysFromDate(stdDiff);
    }

    return numOfDays;
  };

  moment.fn.isBusinessDay = function () {
    return workingWeekdays.includes(+moment(this).format('E'));
  };

  moment.fn.countBusinessDaysInDaysFromDate = function (days) {
    let date = this, counter = 0;
    for (let i = 0; i < days; i++) {
      if (workingWeekdays.includes(+date.format('E'))) {
        counter++;
      }
      date.add(1, 'd')
    }
    return counter;
  };

  moment.fn.businessAdd = function (number) {
    var day = this.clone();
    var signal = number < 0 ? -1 : 1;
    var remaining = Math.abs(number);

    while (remaining) {
      day.add(signal, 'days');

      if (day.isBusinessDay()) {
        remaining--;
      }
    }

    return day;
  };

  moment.fn.businessSubtract = function (number, period) {
    return this.businessAdd(-number, period);
  };


  if (typeof module != 'undefined' && module.exports) {
    module.exports = moment;
  }

}