class CodedError extends Error {
  constructor(code, message = null) {
    super(message || code);
    this.code = code;
  }
  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

class DetailedCodedError extends CodedError {
  constructor(code, message = null, details = null) {
    super(code, message);
    this.details = details;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}

class AuthenticationError extends CodedError {
  constructor(message = null) {
    super('NOT_AUTHENTICATED', message);
  }
}

class NotFoundError extends CodedError {
  constructor(message = null) {
    super('NOT_FOUND', message);
  }
}

class ResourceNotFoundError extends CodedError {
  constructor(message = null) {
    super('RESOURCE_NOT_FOUND', message);
  }
}

class DuplicatedResourceError extends CodedError {
  constructor(message = null) {
    super('DUPLICATED_RESOURCE', message);
  }
}

class ValidationError extends DetailedCodedError {
  constructor(message = null, details = null) {
    super('VALIDATION_FAILED', message, details);
  }
}

module.exports = {
  CodedError,
  NotFoundError,
  ValidationError,
  ResourceNotFoundError,
  DuplicatedResourceError,
  AuthenticationError,
};
