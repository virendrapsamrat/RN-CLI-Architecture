import React, {memo, useMemo, useCallback} from 'react';
import {Pressable, ViewStyle} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Icon} from '@components/atoms/Icon/Icon';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  accessibilityLabel?: string;
}

export const Checkbox = memo<CheckboxProps>(
  ({checked, onChange, disabled = false, accessibilityLabel}) => {
    const {theme} = useTheme();

    const boxStyle = useMemo((): ViewStyle => {
      return {
        width: theme.responsiveSizes.iconSize.sm + theme.spacing.xs,
        height: theme.responsiveSizes.iconSize.sm + theme.spacing.xs,
        borderRadius: theme.radius.xs,
        borderWidth: theme.borderWidth.medium,
        borderColor: checked ? theme.colors.primary : theme.colors.inputBorder,
        backgroundColor: checked ? theme.colors.primary : theme.colors.inputBackground,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? theme.opacity.disabled : theme.opacity.full,
      };
    }, [theme, checked, disabled]);

    const handlePress = useCallback(() => {
      if (!disabled) {
        onChange(!checked);
      }
    }, [checked, disabled, onChange]);

    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={boxStyle}
        accessibilityRole="checkbox"
        accessibilityState={{checked, disabled}}
        accessibilityLabel={accessibilityLabel ?? 'Checkbox'}>
        {checked && (
          <Icon
            name="checkmark"
            size={theme.responsiveSizes.iconSize.sm}
            color={theme.colors.onPrimary}
          />
        )}
      </Pressable>
    );
  },
);

Checkbox.displayName = 'Checkbox';
