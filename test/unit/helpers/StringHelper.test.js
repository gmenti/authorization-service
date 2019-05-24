const { expect } = require('../helpers');
const StringHelper = require('../../../src/helpers/StringHelper');

describe('StringHelper', () => {
  const stringHelper = new StringHelper();

  describe('#formatPhoneNumber', () => {
    it('should return formated phone number (XX) XXXX.XXXX with 12 characters', () => {
      expect(stringHelper.formatPhoneNumber('555198765432'))
        .to.be.eql('(51) 9876.5432');
    });
    it('should return formated phone number (XX) XXXXX.XXXX with 13 characters', () => {
      expect(stringHelper.formatPhoneNumber('5551987654321'))
        .to.be.eql('(51) 98765.4321');
    });
    it('should return empty string on send empty phone number', () => {
      expect(stringHelper.formatPhoneNumber('')).to.be.eql('');
    });
    it('should return empty string on send string with 11 character', () => {
      expect(stringHelper.formatPhoneNumber('12345678901')).to.be.eql('');
    });
    it('should return empty string on send string with 10 character', () => {
      expect(stringHelper.formatPhoneNumber('1234567890')).to.be.eql('');
    });
  });

  describe('#toNameCase', () => {
    it('should format lowercased string', () => {
      expect(stringHelper.toNameCase('fulano de tal'))
        .to.be.eql('Fulano de Tal');
    });
    it('should format uppercased string', () => {
      expect(stringHelper.toNameCase('FULANO DE TAL'))
        .to.be.eql('Fulano de Tal');
    });
    it('should format string with one word', () => {
      expect(stringHelper.toNameCase('fulano'))
        .to.be.eql('Fulano');
    });
    it('should format string with random case', () => {
      expect(stringHelper.toNameCase('fUlAnO'))
        .to.be.eql('Fulano');
    });
  });
});
