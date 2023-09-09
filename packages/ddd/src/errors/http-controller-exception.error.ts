import { HttpException } from "@nestjs/common";

export class HttpControllerException extends HttpException {
  constructor(originalError: unknown) {
    const error = originalError as Error;
    super(error.message, 500, { cause: error });
  }
}
