const namecase = require('namecase');

class StringHelper {
  /**
   * @param {String} phoneNumber
   */
  formatPhoneNumber(phoneNumber) {
    if (phoneNumber.length === 13) {
      return `(${phoneNumber.substr(2, 2)}) ${phoneNumber.substr(4, 5)}.${phoneNumber.substr(9)}`;
    }
    if (phoneNumber.length === 12) {
      return `(${phoneNumber.substr(2, 2)}) ${phoneNumber.substr(4, 4)}.${phoneNumber.substr(8)}`;
    }
    return '';
  }

  /**
   * @param {String} name
   * @return {String}
   */
  toNameCase(name) {
    let stringNameCased = name.toLowerCase().trim();
    if (namecase.checkName(stringNameCased)) {
      stringNameCased = namecase(stringNameCased);
    }
    return stringNameCased;
  }
}

module.exports = StringHelper;
