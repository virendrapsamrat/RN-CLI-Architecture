import React, {memo, useMemo, useCallback} from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Icon} from '@components/atoms/Icon/Icon';

export interface DatePickerProps {
  label?: string;
  value?: Date;
  placeholder?: string;
  onPress?: () => void;
  disabled?: boolean;
  error?: string;
  dateFormat?: string;
}

export const DatePicker = memo<DatePickerProps>(
  ({
    label,
    value,
    placeholder = 'Select date',
    onPress,
    disabled = false,
    error,
    dateFormat = 'MMM d, yyyy',
  }) => {
    const {theme} = useTheme();

    const containerStyle = useMemo(
      () => ({
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        backgroundColor: theme.colors.inputBackground,
        borderWidth: theme.borderWidth.thin,
        borderColor: error ? theme.colors.error : theme.colors.inputBorder,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        opacity: disabled ? theme.opacity.disabled : theme.opacity.full,
      }),
      [theme, error, disabled],
    );

    const handlePress = useCallback(() => {
      if (!disabled) {
        onPress?.();
      }
    }, [disabled, onPress]);

    const displayValue = value ? format(value, dateFormat) : placeholder;
    const displayColor = value ? theme.colors.text : theme.colors.placeholder;

    return (
      <View style={styles.wrapper}>
        {label && (
          <Text variant="label" color={theme.colors.text}>
            {label}
          </Text>
        )}
        {label && <View style={{height: theme.spacing.xs}} />}
        <Pressable
          onPress={handlePress}
          style={containerStyle}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={label ?? placeholder}
          accessibilityHint="Opens date picker">
          <Text variant="body" color={displayColor}>
            {displayValue}
          </Text>
          <Icon name="calendar-outline" size={theme.responsiveSizes.iconSize.md} />
        </Pressable>
        {error && (
          <>
            <View style={{height: theme.spacing.xs}} />
            <Text variant="caption" color={theme.colors.error}>
              {error}
            </Text>
          </>
        )}
      </View>
    );
  },
);

DatePicker.displayName = 'DatePicker';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
});
