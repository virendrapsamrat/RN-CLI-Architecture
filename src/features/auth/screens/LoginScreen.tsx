import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {AuthTemplate} from '@components/templates/AuthTemplate/AuthTemplate';
import {InputField} from '@components/molecules/InputField/InputField';
import {PasswordField} from '@components/molecules/PasswordField/PasswordField';
import {Button} from '@components/atoms/Button/Button';
import {Text} from '@components/atoms/Text/Text';
import {Spacer} from '@components/atoms/Spacer/Spacer';
import {useTheme} from '@app/providers/ThemeProvider';
import {
  LoginFormValues,
  useLoginViewModel,
} from '@features/auth/viewmodels/useLoginViewModel';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export const LoginScreen = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {
    login,
    loginWithBiometrics,
    isBiometricEnabled,
    isLoading,
    error,
    navigateToSignup,
    navigateToForgotPassword,
  } = useLoginViewModel();

  const {control, handleSubmit} = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {email: 'user@cpkc.com', password: 'Password@123'},
  });

  const onSubmit = handleSubmit(values => login(values));

  return (
    <AuthTemplate title={t('auth.login')}>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}, fieldState: {error: fieldError}}) => (
          <InputField
            label={t('auth.email')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldError?.message}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            required
          />
        )}
      />
      <Spacer size="md" />
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}, fieldState: {error: fieldError}}) => (
          <PasswordField
            label={t('auth.password')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldError?.message}
            required
          />
        )}
      />
      <Spacer size="sm" />
      <Pressable onPress={navigateToForgotPassword} accessibilityRole="link">
        <Text variant="bodySmall" color={theme.colors.primary}>
          {t('auth.forgotPassword')}
        </Text>
      </Pressable>
      {error ? (
        <>
          <Spacer size="md" />
          <Text variant="caption" color={theme.colors.error}>
            {error}
          </Text>
        </>
      ) : null}
      <Spacer size="lg" />
      <Button title={t('auth.login')} onPress={onSubmit} loading={isLoading} fullWidth />
      {isBiometricEnabled ? (
        <>
          <Spacer size="md" />
          <Button
            title={t('auth.biometricLogin')}
            variant="outline"
            onPress={loginWithBiometrics}
            loading={isLoading}
            fullWidth
          />
        </>
      ) : null}
      <Spacer size="lg" />
      <View style={styles.footer}>
        <Pressable onPress={navigateToSignup} accessibilityRole="link">
          <Text variant="bodySmall" color={theme.colors.primary}>
            {t('auth.signup')}
          </Text>
        </Pressable>
      </View>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
  },
});
