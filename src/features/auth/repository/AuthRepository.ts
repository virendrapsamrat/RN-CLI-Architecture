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
import {AuthResponseDto} from '@features/auth/dto/AuthDto';
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
    // Mock login for development
    await new Promise(resolve => setTimeout(resolve, 1000));
    const session: AuthSession = {
      user: {
        id: 'user_123',
        email: credentials.email,
        firstName: 'CPKC',
        lastName: 'User',
      },
      tokens: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresAt: Date.now() + 3600000,
      },
    };
    this.persistSession(session);
    return session;
  }

  async signup(payload: SignupPayload): Promise<AuthSession> {
    // Mock signup for development
    await new Promise(resolve => setTimeout(resolve, 1000));
    const session: AuthSession = {
      user: {
        id: 'user_123',
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
      tokens: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresAt: Date.now() + 3600000,
      },
    };
    this.persistSession(session);
    return session;
  }

  async forgotPassword(_email: string): Promise<void> {
    // Mock forgot password for development
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async verifyOtp(payload: OtpPayload): Promise<AuthSession> {
    // Mock OTP verify for development
    await new Promise(resolve => setTimeout(resolve, 1000));
    const session: AuthSession = {
      user: {
        id: 'user_123',
        email: payload.email,
        firstName: 'CPKC',
        lastName: 'User',
      },
      tokens: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresAt: Date.now() + 3600000,
      },
    };
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
    // Mock logout
    await new Promise(resolve => setTimeout(resolve, 500));
    secureStorageService.clearSession();
  }

  async getCurrentUser(): Promise<User | null> {
    return secureStorageService.getObject<User>(STORAGE_KEYS.USER_PROFILE) ?? null;
  }
}

export const authRepository = new AuthRepository();
