const moment = require('moment-timezone');
const { expect } = require('../helpers');
const DateHelper = require('../../../src/helpers/DateHelper');

describe('DateHelper', () => {
  const dateHelper = new DateHelper();

  describe('#removeTime', () => {
    it('should clean time', () => {
      const payload = moment.utc('2019-05-19T12:12:12.666Z');
      const result = moment.utc('2019-05-19T00:00:00.000Z');
      expect(dateHelper.removeTime(payload).toISOString())
        .to.be.eql(result.toISOString());
    });
    it('should return equals time', () => {
      const payload = moment.utc('2019-05-19T12:12:12.666Z');
      const result = moment.utc('2019-05-19T00:00:00.000Z');
      expect(dateHelper.removeTime(payload).toISOString())
        .to.be.eql(result.toISOString());
    });
  });

  describe('#getDiffInDaysWithCleanedTime', () => {
    it('should ignore time on diff days using first ms', () => {
      const dateA = moment.utc('2019-05-19T00:00:00.001Z');
      const dateB = moment.utc('2019-05-19T00:00:00.000Z');
      expect(dateHelper.getDiffInDaysWithCleanedTime(dateA, dateB))
        .to.be.eql(0);
    });
    it('should ignore time on diff days using last ms', () => {
      const dateA = moment.utc('2019-05-19T23:59:59.999Z');
      const dateB = moment.utc('2019-05-19T00:00:00.000Z');
      expect(dateHelper.getDiffInDaysWithCleanedTime(dateA, dateB))
        .to.be.eql(0);
    });
    it('should return number > 0 on dateA > dateB', () => {
      const dateA = moment.utc('2019-05-19T00:00:00.001Z');
      const dateB = moment.utc('2019-05-18T00:00:00.000Z');
      expect(dateHelper.getDiffInDaysWithCleanedTime(dateA, dateB))
        .to.be.eql(1);
    });
    it('should return number < 0 on dateA < dateB', () => {
      const dateA = moment.utc('2019-05-18T00:00:00.000Z');
      const dateB = moment.utc('2019-05-19T00:00:00.000Z');
      expect(dateHelper.getDiffInDaysWithCleanedTime(dateA, dateB))
        .to.be.eql(-1);
    });
  });

  describe('#getDiffInDaysWithCleanedTimeFromNow', () => {
    it('should return 0 on send actual date', () => {
      expect(dateHelper.getDiffInDaysWithCleanedTimeFromNow(moment.utc()))
        .to.be.eql(0);
    });
    it('should return 1 on send tomorrow date', () => {
      const tomorrowDate = moment.utc().add(1, 'day');
      expect(dateHelper.getDiffInDaysWithCleanedTimeFromNow(tomorrowDate))
        .to.be.eql(1);
    });
    it('should return - 1 on send yesterday date', () => {
      const yesterdayDate = moment.utc().add(-1, 'day');
      expect(dateHelper.getDiffInDaysWithCleanedTimeFromNow(yesterdayDate))
        .to.be.eql(-1);
    });
  });
});

