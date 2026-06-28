import Config from 'react-native-config';

export type AppEnvironment = 'development' | 'qa' | 'staging' | 'production';

export interface AppConfig {
  appName: string;
  env: AppEnvironment;
  apiBaseUrl: string;
  apiTimeout: number;
  enableAnalytics: boolean;
  enableCrashReporting: boolean;
}

export const appConfig: AppConfig = {
  appName: Config.APP_NAME ?? 'RN-CLI-App',
  env: (Config.ENV as AppEnvironment) ?? 'development',
  apiBaseUrl: Config.API_BASE_URL ?? 'https://dev-api.example.com',
  apiTimeout: Number(Config.API_TIMEOUT ?? 30000),
  enableAnalytics: Config.ENABLE_ANALYTICS === 'true',
  enableCrashReporting: Config.ENABLE_CRASH_REPORTING === 'true',
};

export const isDevelopment = appConfig.env === 'development';
export const isProduction = appConfig.env === 'production';
