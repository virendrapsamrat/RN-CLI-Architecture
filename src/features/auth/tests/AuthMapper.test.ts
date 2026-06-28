import {mapAuthResponseToSession} from '@features/auth/mapper/AuthMapper';
import {AuthResponseDto} from '@features/auth/dto/AuthDto';

describe('AuthMapper', () => {
  const mockDto: AuthResponseDto = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    expiresIn: 3600,
    user: {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  };

  it('maps auth response to session entity', () => {
    const session = mapAuthResponseToSession(mockDto);

    expect(session.user.email).toBe('test@example.com');
    expect(session.tokens.accessToken).toBe('access-token');
    expect(session.tokens.refreshToken).toBe('refresh-token');
    expect(session.tokens.expiresAt).toBeGreaterThan(Date.now());
  });
});
