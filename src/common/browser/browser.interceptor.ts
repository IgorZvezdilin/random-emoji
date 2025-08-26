import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.header('User-Agent');
    const browser = userAgent ? userAgent.split(' ')[0] : 'Unknown';
    request.headers.browser = browser;
    console.log(`Manipulate with request: ${request.header('browser')}`);
    return next.handle();
  }
}
