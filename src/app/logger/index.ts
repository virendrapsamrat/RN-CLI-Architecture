import {appConfig, isDevelopment} from '@app/config';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

class LoggerService {
  private formatEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
  }

  private log(entry: LogEntry): void {
    if (isDevelopment) {
      const prefix = `[${entry.level}] ${entry.timestamp}`;
      switch (entry.level) {
        case LogLevel.DEBUG:
          console.debug(prefix, entry.message, entry.context ?? '');
          break;
        case LogLevel.INFO:
          console.info(prefix, entry.message, entry.context ?? '');
          break;
        case LogLevel.WARN:
          console.warn(prefix, entry.message, entry.context ?? '');
          break;
        case LogLevel.ERROR:
          console.error(prefix, entry.message, entry.context ?? '');
          break;
      }
      return;
    }

    // Production: route to remote logging / Crashlytics / Sentry adapters
    if (entry.level === LogLevel.ERROR && appConfig.enableCrashReporting) {
      // crashReportingService.recordError(entry);
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log(this.formatEntry(LogLevel.DEBUG, message, context));
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(this.formatEntry(LogLevel.INFO, message, context));
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(this.formatEntry(LogLevel.WARN, message, context));
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log(this.formatEntry(LogLevel.ERROR, message, context));
  }
}

export const logger = new LoggerService();
