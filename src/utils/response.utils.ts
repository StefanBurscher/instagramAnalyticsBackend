'use strict';

interface Success {
    result: SuccessBody;
}

interface SuccessBody {
    items?: any;
    value?: any;
}

interface FailBody {
    error?: any;
    errors?: any;
}

export class APIResponse {
  static success (data: any) {
    const obj: Success = {result: {}};

    if (Array.isArray(data)) {
      obj.result.items = data;
    } else if (data && typeof data === 'object') {
      Object.assign(obj.result, data);
    } else {
      obj.result.value = data;
    }

    return obj;
  }

  static error (code: number, message: string, errors?: any) {
    const obj: FailBody = {
      error: {
        code: code,
        message: message
      }
    };

    if (errors !== null) { // allow anything here, not just Arrays
      obj.errors = errors;
    }

    return obj;
  }
}
