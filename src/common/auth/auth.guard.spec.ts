import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { createMock } from '@golevelup/ts-jest';

describe('AuthGuard', () => {
  const authGard = new AuthGuard();
  it('should be defined', () => {
    expect(authGard).toBeDefined();
  });

  it('should return true if there`s a valid API KEY', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => {
        return {
          getRequest: () => ({
            header: () => 'SECRET',
          }),
        };
      },
    });
    const result = authGard.canActivate(context);
    console.log(`result ${result}`);
    expect(result).toBe(true);
  });

  it('should return false if there is not a valid API KEY', () => {
    const context = createMock<ExecutionContext>({
      switchToHttp: () => {
        return {
          getRequest: () => ({
            header: () => undefined,
          }),
        };
      },
    });
    const result = authGard.canActivate(context);
    expect(result).toBe(false);
  });
});
