import {AppError, ApiErrorCode, mapAxiosError} from '@shared/helpers/errorHandler';

describe('errorHandler', () => {
  it('maps timeout errors', () => {
    const error = mapAxiosError({code: 'ECONNABORTED', message: 'timeout'});
    expect(error.code).toBe(ApiErrorCode.TIMEOUT);
  });

  it('maps network errors', () => {
    const error = mapAxiosError({message: 'Network Error'});
    expect(error.code).toBe(ApiErrorCode.NETWORK);
  });

  it('maps 401 to unauthorized', () => {
    const error = mapAxiosError({
      response: {status: 401, data: {message: 'Unauthorized'}},
    });
    expect(error.code).toBe(ApiErrorCode.UNAUTHORIZED);
  });

  it('preserves AppError instances', () => {
    const original = new AppError('Test', ApiErrorCode.UNKNOWN);
    expect(mapAxiosError(original)).toBe(original);
  });
});
