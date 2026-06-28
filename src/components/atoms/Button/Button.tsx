import React, {memo, useMemo} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = memo<ButtonProps>(
  ({
    title,
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    style,
    ...props
  }) => {
    const {theme} = useTheme();

    const buttonStyle = useMemo((): ViewStyle => {
      const base: ViewStyle = {
        borderRadius: theme.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        opacity: disabled || loading ? theme.opacity.disabled : theme.opacity.full,
      };

      const sizes: Record<ButtonSize, ViewStyle> = {
        sm: {paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.lg},
        md: {paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xl},
        lg: {paddingVertical: theme.spacing.lg, paddingHorizontal: theme.spacing.xxl},
      };

      const variants: Record<ButtonVariant, ViewStyle> = {
        primary: {backgroundColor: theme.colors.primary},
        secondary: {backgroundColor: theme.colors.surfaceSecondary},
        outline: {
          backgroundColor: 'transparent',
          borderWidth: theme.borderWidth.thin,
          borderColor: theme.colors.primary,
        },
        ghost: {backgroundColor: 'transparent'},
      };

      return {
        ...base,
        ...sizes[size],
        ...variants[variant],
        ...(fullWidth ? {width: '100%'} : {}),
      };
    }, [theme, variant, size, disabled, loading, fullWidth]);

    const textColor =
      variant === 'primary'
        ? theme.colors.onPrimary
        : variant === 'secondary'
        ? theme.colors.text
        : theme.colors.primary;

    return (
      <TouchableOpacity
        style={[buttonStyle, style]}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{disabled: Boolean(disabled || loading), busy: loading}}
        {...props}>
        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <Text variant="button" color={textColor}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);

Button.displayName = 'Button';
