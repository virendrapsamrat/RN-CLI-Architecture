import {loginSchema} from '@shared/validations/authSchemas';

describe('authSchemas', () => {
  it('validates correct login credentials', async () => {
    const result = await loginSchema.validate({
      email: 'user@example.com',
      password: 'password123',
    });
    expect(result.email).toBe('user@example.com');
  });

  it('rejects invalid email', async () => {
    await expect(
      loginSchema.validate({email: 'invalid', password: 'password123'}),
    ).rejects.toThrow('Invalid email');
  });
});
