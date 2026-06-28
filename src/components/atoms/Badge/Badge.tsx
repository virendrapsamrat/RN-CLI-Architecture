import React, {memo, useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge = memo<BadgeProps>(({label, variant = 'primary', size = 'md'}) => {
  const {theme} = useTheme();

  const containerStyle = useMemo((): ViewStyle => {
    const variants: Record<BadgeVariant, ViewStyle> = {
      primary: {backgroundColor: theme.colors.primaryLight},
      secondary: {backgroundColor: theme.colors.surfaceSecondary},
      success: {backgroundColor: theme.colors.success},
      warning: {backgroundColor: theme.colors.warning},
      error: {backgroundColor: theme.colors.error},
      info: {backgroundColor: theme.colors.info},
    };

    const sizes: Record<BadgeSize, ViewStyle> = {
      sm: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xxs,
      },
      md: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
      },
    };

    return {
      borderRadius: theme.radius.full,
      alignSelf: 'flex-start',
      ...variants[variant],
      ...sizes[size],
    };
  }, [theme, variant, size]);

  const textColor = useMemo(() => {
    if (variant === 'primary' || variant === 'secondary') {
      return variant === 'primary' ? theme.colors.primary : theme.colors.textSecondary;
    }
    return theme.colors.onPrimary;
  }, [theme, variant]);

  return (
    <View style={containerStyle} accessibilityRole="text" accessibilityLabel={label}>
      <Text variant={size === 'sm' ? 'caption' : 'label'} color={textColor}>
        {label}
      </Text>
    </View>
  );
});

Badge.displayName = 'Badge';
