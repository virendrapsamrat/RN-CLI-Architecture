import React, {memo, forwardRef} from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';

export interface InputProps extends TextInputProps {
  hasError?: boolean;
}

export const Input = memo(
  forwardRef<TextInput, InputProps>(({hasError, style, ...props}, ref) => {
    const {theme} = useTheme();

    return (
      <TextInput
        ref={ref}
        placeholderTextColor={theme.colors.placeholder}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.inputBackground,
            borderColor: hasError ? theme.colors.error : theme.colors.inputBorder,
            borderRadius: theme.radius.md,
            color: theme.colors.text,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            fontSize: theme.typography.body.fontSize,
          },
          style,
        ]}
        {...props}
      />
    );
  }),
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: '100%',
  },
});
