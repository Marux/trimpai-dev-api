import { HttpException, HttpStatus } from '@nestjs/common';

export default class Utils {
  static errorResponse(error: any): never {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (error instanceof HttpException) {
      statusCode = error.getStatus();
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    const payload = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    };

    throw new HttpException(payload, statusCode);
  }
}
