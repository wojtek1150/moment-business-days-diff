'use strict';
const moment = require('../index');
const expect = require('chai').expect;

const resetLocale = function (done) {
  moment.updateLocale('us', {});
  done();
};

describe('Moment Business Days', function () {
  afterEach(resetLocale);

  describe('.businessAdd', function () {
    it('should add some b days', function (done) {
      const friday = moment().startOf('week').add(5, 'days');
      expect(friday.businessAdd(1).format('dddd')).to.eql('Monday');
      done();
    });
    it('should add some b days', function (done) {
      const sat = moment().startOf('week').add(6, 'days');
      expect(sat.businessAdd(1).format('dddd')).to.eql('Monday');
      done();
    });
    it('should add some b days', function (done) {
      const sun = moment().startOf('week');
      expect(sun.businessAdd(1).format('dddd')).to.eql('Monday');
      done();
    });
  });

  describe('.isBusinessDay', function () {
    it('When today is a regular weekday should be true', function (done) {
      const wednesday = moment().startOf('week').add(3, 'days');
      expect(wednesday.isBusinessDay()).to.be.true;
      done();
    });

    it('When today is a weekend should be false', function (done) {
      const sunday = moment().startOf('week');
      expect(sunday.isBusinessDay()).to.be.false;
      done();
    });
  });


  describe('.countBusinessDaysInDaysFromDate', function () {
    it('should calculate number of business days', function (done) {
      expect(moment('2018-09-17').countBusinessDaysInDaysFromDate(3)).to.eql(3);
      expect(moment('2018-09-20').countBusinessDaysInDaysFromDate(3)).to.eql(2);
      expect(moment('2018-09-12').countBusinessDaysInDaysFromDate(7)).to.eql(5);
      done();
    });
  });

  describe('.businessDiff', function () {
    it('should calculate number of business days between weekdays', function (done) {
      let start = moment().businessSubtract(3);
      console.log(start.format());
      let diff = moment().businessDiff(start);
      expect(diff).to.eql(3);

      diff = moment('2018-09-20').businessDiff(moment('2018-09-21'));
      expect(diff).to.eql(1);
      diff = moment('2018-09-21').businessDiff(moment('2018-09-20'));
      expect(diff).to.eql(1);

      done();
    });

    it('should calculate number of business days across weekends', function (done) {
      let diff = moment('2018-09-14 23:59:59').businessDiff(moment('2018-09-19'));
      expect(diff).to.eql(3);

      diff = moment('2018-09-12').businessDiff(moment('2018-09-19'));
      expect(diff).to.eql(5);
      diff = moment('2018-09-19').businessDiff(moment('2018-09-12'));
      expect(diff).to.eql(5);

      done();
    });

    it('should return zero of business days in weekends', function () {
      let diff = moment('2018-09-15').businessDiff(moment('2018-09-16'));
      expect(diff).to.eql(0);
    });
  })
});