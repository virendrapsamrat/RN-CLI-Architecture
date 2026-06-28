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
  SignupFormValues,
  useSignupViewModel,
} from '@features/auth/viewmodels/useSignupViewModel';

const signupSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export const SignupScreen = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {signup, isLoading, error, navigateToLogin} = useSignupViewModel();

  const {control, handleSubmit} = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {firstName: '', lastName: '', email: '', password: ''},
  });

  const onSubmit = handleSubmit(values => signup(values));

  return (
    <AuthTemplate title={t('auth.signup')}>
      <Controller
        control={control}
        name="firstName"
        render={({field: {onChange, onBlur, value}, fieldState: {error: fieldError}}) => (
          <InputField
            label="First Name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldError?.message}
            autoComplete="given-name"
            required
          />
        )}
      />
      <Spacer size="md" />
      <Controller
        control={control}
        name="lastName"
        render={({field: {onChange, onBlur, value}, fieldState: {error: fieldError}}) => (
          <InputField
            label="Last Name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldError?.message}
            autoComplete="family-name"
            required
          />
        )}
      />
      <Spacer size="md" />
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
      {error ? (
        <>
          <Spacer size="md" />
          <Text variant="caption" color={theme.colors.error}>
            {error}
          </Text>
        </>
      ) : null}
      <Spacer size="lg" />
      <Button title={t('auth.signup')} onPress={onSubmit} loading={isLoading} fullWidth />
      <Spacer size="lg" />
      <View style={styles.footer}>
        <Pressable onPress={navigateToLogin} accessibilityRole="link">
          <Text variant="bodySmall" color={theme.colors.primary}>
            {t('auth.login')}
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
