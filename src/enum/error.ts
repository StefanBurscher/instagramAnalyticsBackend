
class AuthenticationError extends Error {
}

class AuthorizationError extends Error {
}

class NotFoundError extends Error {
}

class ConflictError extends Error {
}

class NotImplementedError extends Error {
}

class InvalidRequestError extends Error {
}

class ServiceUnavailableError extends Error {
}

class GetMessagesError extends Error {
}

class RequestDeniedError extends Error {
}

class WorkerError extends Error {
  private id: string;
  private errorStack?: string;
  private errorMessage?: string;
  private description?: string;

  constructor(id: string, error: {[key: string]: any}, description?: string) {
    super();
    this.id = id;

    if (error.stack || error.message) {
      this.errorStack = error.stack;
      this.errorMessage = error.message;
    } else {
      this.errorMessage = <any> error;
    }

    this.description = description;
  }
}

class CustomValidationError extends Error {
  private readonly _err: any;

  constructor(errors: any) {
    super();
    this._err = errors;
  }

  get err(): any {
    return this._err;
  }
}
const err = new ServiceUnavailableError();

class InvalidLinkedinAuthorizationError extends Error {}


export {
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  InvalidRequestError,
  ServiceUnavailableError,
  NotImplementedError,
  CustomValidationError,
  WorkerError,
  GetMessagesError,
  RequestDeniedError,
  InvalidLinkedinAuthorizationError
};
