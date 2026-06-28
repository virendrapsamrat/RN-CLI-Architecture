import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import axiosRetry from 'axios-retry';
import {appConfig} from '@app/config';
import {API_ENDPOINTS, STORAGE_KEYS} from '@app/constants';
import {logger} from '@app/logger';
import {secureStorageService} from '@app/storage';
import {mapAxiosError} from '@shared/helpers/errorHandler';

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

const processQueue = (token: string): void => {
  refreshQueue.forEach(callback => callback(token));
  refreshQueue = [];
};

export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: appConfig.apiBaseUrl,
    timeout: appConfig.apiTimeout,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  axiosRetry(client, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: error =>
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === 'ECONNABORTED',
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = secureStorageService.getSecureToken(STORAGE_KEYS.ACCESS_TOKEN);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      logger.debug('API Request', {
        url: config.url,
        method: config.method,
      });
      return config;
    },
    error => Promise.reject(mapAxiosError(error)),
  );

  client.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(resolve => {
            refreshQueue.push((token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(client(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = secureStorageService.getSecureToken(
            STORAGE_KEYS.REFRESH_TOKEN,
          );
          if (!refreshToken) {
            throw mapAxiosError(error);
          }

          const response = await axios.post(
            `${appConfig.apiBaseUrl}${API_ENDPOINTS.AUTH.REFRESH}`,
            {refreshToken},
          );

          const {accessToken, refreshToken: newRefreshToken} = response.data.data;
          secureStorageService.setSecureToken(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
          secureStorageService.setSecureToken(
            STORAGE_KEYS.REFRESH_TOKEN,
            newRefreshToken,
          );

          processQueue(accessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return client(originalRequest);
        } catch (refreshError) {
          secureStorageService.clearSession();
          return Promise.reject(mapAxiosError(refreshError));
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(mapAxiosError(error));
    },
  );

  return client;
};

export const apiClient = createApiClient();
