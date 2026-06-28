import {AuthSession, AuthTokens, User} from '@domain/entities/User';
import {AuthResponseDto} from '@features/auth/dto/AuthDto';

export const mapAuthResponseToSession = (dto: AuthResponseDto): AuthSession => {
  const user: User = {
    id: dto.user.id,
    email: dto.user.email,
    firstName: dto.user.firstName,
    lastName: dto.user.lastName,
    avatarUrl: dto.user.avatarUrl,
  };

  const tokens: AuthTokens = {
    accessToken: dto.accessToken,
    refreshToken: dto.refreshToken,
    expiresAt: Date.now() + dto.expiresIn * 1000,
  };

  return {user, tokens};
};

export const mapUserDtoToEntity = (dto: AuthResponseDto['user']): User => ({
  id: dto.id,
  email: dto.email,
  firstName: dto.firstName,
  lastName: dto.lastName,
  avatarUrl: dto.avatarUrl,
});
