import {AuthSession, User} from '@domain/entities/User';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface OtpPayload {
  email: string;
  otp: string;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  signup(payload: SignupPayload): Promise<AuthSession>;
  forgotPassword(email: string): Promise<void>;
  verifyOtp(payload: OtpPayload): Promise<AuthSession>;
  refreshToken(refreshToken: string): Promise<AuthSession>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
