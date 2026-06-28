import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Input, InputProps} from '@components/atoms/Input/Input';
import {Spacer} from '@components/atoms/Spacer/Spacer';

export interface InputFieldProps extends InputProps {
  label: string;
  error?: string;
  required?: boolean;
  rightAccessory?: React.ReactNode;
}

export const InputField = memo<InputFieldProps>(
  ({label, error, required = false, hasError, rightAccessory, style, ...inputProps}) => {
    const {theme} = useTheme();
    const showError = Boolean(error);
    const inputHasError = hasError ?? showError;

    const accessoryOffset = theme.responsiveSizes.iconSize.md + theme.spacing.md;
    const accessoryRight = theme.spacing.lg;

    return (
      <View style={styles.container}>
        <Text variant="label" color={theme.colors.text}>
          {label}
          {required && (
            <Text variant="label" color={theme.colors.error}>
              {' *'}
            </Text>
          )}
        </Text>
        <Spacer size="xs" />
        <View style={styles.inputRow}>
          <Input
            hasError={inputHasError}
            accessibilityLabel={label}
            style={[rightAccessory ? {paddingRight: accessoryOffset} : undefined, style]}
            {...inputProps}
          />
          {rightAccessory && (
            <View style={[styles.accessory, {right: accessoryRight}]}>
              {rightAccessory}
            </View>
          )}
        </View>
        {showError && (
          <>
            <Spacer size="xs" />
            <Text
              variant="caption"
              color={theme.colors.error}
              accessibilityLiveRegion="polite">
              {error}
            </Text>
          </>
        )}
      </View>
    );
  },
);

InputField.displayName = 'InputField';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputRow: {
    position: 'relative',
    justifyContent: 'center',
  },
  accessory: {
    position: 'absolute',
  },
});
