import {typography, lightTheme} from '@app/theme';

describe('Design System', () => {
  it('defines typography variants', () => {
    expect(typography.h1.fontSize).toBeGreaterThan(typography.body.fontSize);
    expect(typography.button.fontWeight).toBe('600');
  });

  it('defines light theme colors', () => {
    expect(lightTheme.colors.primary).toBeDefined();
    expect(lightTheme.mode).toBe('light');
  });
});
