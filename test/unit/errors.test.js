const { expect } = require('./helpers');

const {
  AuthenticationError,
  NotFoundError,
  ResourceNotFoundError,
  ValidationError
} = require('../../src/errors');

describe('Errors', () => {
  describe('AuthenticationError', ()  => {
    it('should create error with message', () => {
      const message = 'Invalid access token';
      const err = new AuthenticationError(message);
      expect(err.message).to.be.eql(message);
      expect(err.code).to.be.eql('NOT_AUTHENTICATED');
    });
    it('should set default message on create error without message', () => {
      const err = new AuthenticationError();
      expect(err.message).to.be.eql('NOT_AUTHENTICATED');
      expect(err.code).to.be.eql('NOT_AUTHENTICATED');
    });
  });

  describe('NotFoundError', () => {
    it('should create error with message', () => {
      const message = 'Paga not found';
      const err = new NotFoundError(message);
      expect(err.message).to.be.eql(message);
      expect(err.code).to.be.eql('NOT_FOUND');
    });
    it('should set default message on create error without message', () => {
      const err = new NotFoundError();
      expect(err.message).to.be.eql('NOT_FOUND');
      expect(err.code).to.be.eql('NOT_FOUND');
    });
  });

  describe('ResourceNotFoundError', () => {
    it('should create error with message', () => {
      const message = 'Resource not found';
      const err = new ResourceNotFoundError(message);
      expect(err.message).to.be.eql(message);
      expect(err.code).to.be.eql('RESOURCE_NOT_FOUND');
    });
    it('should set default message on create error without message', () => {
      const err = new ResourceNotFoundError();
      expect(err.message).to.be.eql('RESOURCE_NOT_FOUND');
      expect(err.code).to.be.eql('RESOURCE_NOT_FOUND');
    });
  });

  describe('ValidationError', () => {
    it('should create error with message', () => {
      const message = 'Validation failed';
      const err = new ValidationError(message);
      expect(err.message).to.be.eql(message);
      expect(err.code).to.be.eql('VALIDATION_FAILED');
    });
    it('should set default message on create error without message', () => {
      const err = new ValidationError();
      expect(err.message).to.be.eql('VALIDATION_FAILED');
      expect(err.code).to.be.eql('VALIDATION_FAILED');
      expect(err.details).to.be.eql(null);
    });
    it('should set details on create error with details', () => {
      const details = { isValid: true };
      const err = new ValidationError(null, details);
      expect(err.message).to.be.eql('VALIDATION_FAILED');
      expect(err.code).to.be.eql('VALIDATION_FAILED');
      expect(err.details).to.be.eql(details);
    });
  });
});

