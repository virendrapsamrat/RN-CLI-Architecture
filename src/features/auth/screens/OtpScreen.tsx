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
import {OtpFormValues, useOtpViewModel} from '@features/auth/viewmodels/useOtpViewModel';

const otpSchema = yup.object({
  otp: yup
    .string()
    .matches(/^\d{4,6}$/, 'Enter a valid OTP')
    .required('OTP is required'),
});

export const OtpScreen = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const {email, verifyOtp, isLoading, error, navigateToLogin} = useOtpViewModel();

  const {control, handleSubmit} = useForm<OtpFormValues>({
    resolver: yupResolver(otpSchema),
    defaultValues: {otp: ''},
  });

  const onSubmit = handleSubmit(values => verifyOtp(values.otp));

  return (
    <AuthTemplate title={t('auth.otpTitle')} subtitle={t('auth.otpSubtitle')}>
      <Text variant="bodySmall" color={theme.colors.textSecondary}>
        {email}
      </Text>
      <Spacer size="lg" />
      <Controller
        control={control}
        name="otp"
        render={({field: {onChange, onBlur, value}, fieldState: {error: fieldError}}) => (
          <InputField
            label="OTP"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={fieldError?.message}
            keyboardType="number-pad"
            maxLength={6}
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
      <Button title="Verify" onPress={onSubmit} loading={isLoading} fullWidth />
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
