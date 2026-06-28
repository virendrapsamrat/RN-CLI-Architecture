import {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NAVIGATION} from '@app/constants';
import {authRepository} from '@features/auth/repository/AuthRepository';
import {AuthStackParamList} from '@app/navigation/types';
import {mapAxiosError} from '@shared/helpers/errorHandler';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export interface ForgotPasswordFormValues {
  email: string;
}

export const useForgotPasswordViewModel = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendResetLink = useCallback(
    async (email: string) => {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      try {
        await authRepository.forgotPassword(email);
        setIsSuccess(true);
        navigation.navigate(NAVIGATION.OTP, {email});
      } catch (err) {
        setError(mapAxiosError(err).message);
      } finally {
        setIsLoading(false);
      }
    },
    [navigation],
  );

  const navigateToLogin = useCallback(() => {
    navigation.navigate(NAVIGATION.LOGIN);
  }, [navigation]);

  return {
    sendResetLink,
    isLoading,
    error,
    isSuccess,
    navigateToLogin,
  };
};
