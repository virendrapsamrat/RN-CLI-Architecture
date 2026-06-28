import {apiClient} from '@data/api/client';
import {API_ENDPOINTS, STORAGE_KEYS} from '@app/constants';
import {secureStorageService} from '@app/storage';
import {
  IAuthRepository,
  LoginCredentials,
  OtpPayload,
  SignupPayload,
} from '@domain/repositories/IAuthRepository';
import {AuthSession, User} from '@domain/entities/User';
import {
  AuthResponseDto,
  LoginRequestDto,
  OtpRequestDto,
  SignupRequestDto,
} from '@features/auth/dto/AuthDto';
import {mapAuthResponseToSession} from '@features/auth/mapper/AuthMapper';
import {ApiResponse} from '@shared/types/api.types';

export class AuthRepository implements IAuthRepository {
  private persistSession(session: AuthSession): void {
    secureStorageService.setSecureToken(
      STORAGE_KEYS.ACCESS_TOKEN,
      session.tokens.accessToken,
    );
    secureStorageService.setSecureToken(
      STORAGE_KEYS.REFRESH_TOKEN,
      session.tokens.refreshToken,
    );
    secureStorageService.setObject(STORAGE_KEYS.USER_PROFILE, session.user);
    secureStorageService.setString(
      STORAGE_KEYS.SESSION_EXPIRY,
      String(session.tokens.expiresAt),
    );
  }

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const payload: LoginRequestDto = credentials;
    const {data} = await apiClient.post<ApiResponse<AuthResponseDto>>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload,
    );
    const session = mapAuthResponseToSession(data.data);
    this.persistSession(session);
    return session;
  }

  async signup(payload: SignupPayload): Promise<AuthSession> {
    const request: SignupRequestDto = payload;
    const {data} = await apiClient.post<ApiResponse<AuthResponseDto>>(
      API_ENDPOINTS.AUTH.SIGNUP,
      request,
    );
    const session = mapAuthResponseToSession(data.data);
    this.persistSession(session);
    return session;
  }

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {email});
  }

  async verifyOtp(payload: OtpPayload): Promise<AuthSession> {
    const request: OtpRequestDto = payload;
    const {data} = await apiClient.post<ApiResponse<AuthResponseDto>>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      request,
    );
    const session = mapAuthResponseToSession(data.data);
    this.persistSession(session);
    return session;
  }

  async refreshToken(refreshToken: string): Promise<AuthSession> {
    const {data} = await apiClient.post<ApiResponse<AuthResponseDto>>(
      API_ENDPOINTS.AUTH.REFRESH,
      {refreshToken},
    );
    const session = mapAuthResponseToSession(data.data);
    this.persistSession(session);
    return session;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      secureStorageService.clearSession();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return secureStorageService.getObject<User>(STORAGE_KEYS.USER_PROFILE) ?? null;
  }
}

export const authRepository = new AuthRepository();
