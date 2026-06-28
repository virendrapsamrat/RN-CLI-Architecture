export enum ApiErrorCode {
  NETWORK = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION = 'VALIDATION_ERROR',
  SERVER = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
}

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: ApiErrorCode,
    public readonly statusCode?: number,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network connection unavailable') {
    super(message, ApiErrorCode.NETWORK);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, ApiErrorCode.VALIDATION, 422, details);
    this.name = 'ValidationError';
  }
}

export class ApiError extends AppError {
  constructor(
    message: string,
    code: ApiErrorCode,
    statusCode?: number,
    details?: Record<string, unknown>,
  ) {
    super(message, code, statusCode, details);
    this.name = 'ApiError';
  }
}

export const mapAxiosError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  const axiosError = error as {
    code?: string;
    message?: string;
    response?: {status?: number; data?: {message?: string}};
  };

  if (axiosError.code === 'ECONNABORTED') {
    return new AppError('Request timed out', ApiErrorCode.TIMEOUT);
  }

  if (!axiosError.response) {
    return new NetworkError(axiosError.message);
  }

  const status = axiosError.response.status;
  const message =
    axiosError.response.data?.message ?? axiosError.message ?? 'Unknown API error';

  switch (status) {
    case 401:
      return new ApiError(message, ApiErrorCode.UNAUTHORIZED, status);
    case 403:
      return new ApiError(message, ApiErrorCode.FORBIDDEN, status);
    case 404:
      return new ApiError(message, ApiErrorCode.NOT_FOUND, status);
    case 422:
      return new ValidationError(message);
    default:
      return new ApiError(
        message,
        status && status >= 500 ? ApiErrorCode.SERVER : ApiErrorCode.UNKNOWN,
        status,
      );
  }
};
