import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly loggerService: LoggerService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.loggerService.info('Go throw guard');
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');
    return apiKey === 'SECRET';
  }
}
