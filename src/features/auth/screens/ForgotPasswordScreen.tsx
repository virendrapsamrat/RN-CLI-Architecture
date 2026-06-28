import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {AuthTemplate} from '@components/templates/AuthTemplate/AuthTemplate';
import {InputField} from '@components/molecules/InputField/InputField';
import {Button} from '@components/atoms/Button/Button';
import {Text} from '@components/atoms/Text/Text';
import {Spacer} from '@components/atoms/Spacer/Spacer';
import {useTheme} from '@app/providers/ThemeProvider';
import {
  ForgotPasswordFormValues,
  useForgotPasswordViewModel,
} from '@features/auth/viewmodels/useForgotPasswordViewModel';

const forgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export const ForgotPasswordScreen = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {sendResetLink, isLoading, error, navigateToLogin} = useForgotPasswordViewModel();

  const {control, handleSubmit} = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {email: ''},
  });

  const onSubmit = handleSubmit(values => sendResetLink(values.email));

  return (
    <AuthTemplate
      title={t('auth.forgotPassword')}
      subtitle="Enter your email to receive a verification code.">
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
      {error ? (
        <>
          <Spacer size="md" />
          <Text variant="caption" color={theme.colors.error}>
            {error}
          </Text>
        </>
      ) : null}
      <Spacer size="lg" />
      <Button title="Send Code" onPress={onSubmit} loading={isLoading} fullWidth />
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
