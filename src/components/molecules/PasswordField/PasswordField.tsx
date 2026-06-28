import React, {memo, useState, useCallback} from 'react';
import {Pressable} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {InputField, InputFieldProps} from '@components/molecules/InputField/InputField';
import {Icon} from '@components/atoms/Icon/Icon';

export type PasswordFieldProps = Omit<InputFieldProps, 'secureTextEntry' | 'rightIcon'>;

export const PasswordField = memo<PasswordFieldProps>(props => {
  const {theme} = useTheme();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return (
    <InputField
      {...props}
      secureTextEntry={!visible}
      textContentType="password"
      autoComplete="password"
      rightAccessory={
        <Pressable
          onPress={toggleVisibility}
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Hide password' : 'Show password'}>
          <Icon
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={theme.responsiveSizes.iconSize.md}
            color={theme.colors.textSecondary}
          />
        </Pressable>
      }
    />
  );
});

PasswordField.displayName = 'PasswordField';
