const moment = require('moment-timezone');

class DateHelper {
  /**
   * @param {import('moment-timezone').Moment} momentDate
   * @return {import('moment-timezone').Moment}
   */
  removeTime(momentDate) {
    return momentDate
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
  }

  /**
   * @param {import('moment-timezone').Moment} momentDateA 
   * @param {import('moment-timezone').Moment} momentDateB
   * @return {Number}
   */
  getDiffInDaysWithCleanedTime(momentDateA, momentDateB) {
    return this.removeTime(momentDateA)
      .diff(this.removeTime(momentDateB), 'days');
  }
  
  /**
   * @param {import('moment-timezone').Moment} momentDate
   * @return {Number}
   */
  getDiffInDaysWithCleanedTimeFromNow(momentDate) {
    return this.getDiffInDaysWithCleanedTime(momentDate, moment.utc());
  }
}

module.exports = DateHelper;
