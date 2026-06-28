import React, {memo, useMemo, useRef, useCallback, useState} from 'react';
import {View, TextInput, Pressable, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';

const OTP_LENGTH = 6;

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  autoFocus?: boolean;
}

export const OTPInput = memo<OTPInputProps>(
  ({value, onChange, label, error, autoFocus = false}) => {
    const {theme} = useTheme();
    const inputRef = useRef<TextInput>(null);
    const [focused, setFocused] = useState(autoFocus);

    const digits = useMemo(() => {
      const chars = value.split('').slice(0, OTP_LENGTH);
      while (chars.length < OTP_LENGTH) {
        chars.push('');
      }
      return chars;
    }, [value]);

    const handleChange = useCallback(
      (text: string) => {
        const sanitized = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
        onChange(sanitized);
      },
      [onChange],
    );

    const handleBoxPress = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    const boxStyle = useMemo(
      () => (index: number) => ({
        width: theme.responsiveSizes.iconSize.xl,
        height: theme.responsiveSizes.iconSize.xl + theme.spacing.sm,
        borderRadius: theme.radius.md,
        borderWidth: theme.borderWidth.medium,
        borderColor: error
          ? theme.colors.error
          : focused && index === value.length
          ? theme.colors.primary
          : theme.colors.inputBorder,
        backgroundColor: theme.colors.inputBackground,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
      }),
      [theme, error, focused, value.length],
    );

    return (
      <View style={styles.container}>
        {label && (
          <Text variant="label" color={theme.colors.text}>
            {label}
          </Text>
        )}
        {label && <View style={{height: theme.spacing.sm}} />}
        <Pressable
          onPress={handleBoxPress}
          style={[styles.row, {gap: theme.spacing.sm}]}
          accessibilityRole="none">
          {digits.map((digit, index) => (
            <View key={index} style={boxStyle(index)}>
              <Text variant="h3" color={theme.colors.text}>
                {digit}
              </Text>
            </View>
          ))}
        </Pressable>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={styles.hiddenInput}
          accessibilityLabel={label ?? 'One-time password input'}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
        />
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

OTPInput.displayName = 'OTPInput';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
