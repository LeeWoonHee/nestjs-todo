import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMsg } from '../decorators/response-message-decorator';

export interface Response<T> {
  message: string;
  statusCode: number;
  data: T;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const currentStatusCode = context.switchToHttp().getResponse().statusCode;
    const responseMessage = this.reflector.get<string>(
      ResponseMsg,
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => ({
        message: responseMessage,
        statusCode: currentStatusCode,
        data: data.data || data,
      })),
    );
  }
}
