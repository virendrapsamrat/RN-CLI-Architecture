import {useCallback, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NAVIGATION} from '@app/constants';
import {featureFlagService} from '@app/featureFlags';
import {authRepository} from '@features/auth/repository/AuthRepository';
import {LoginUseCase} from '@features/auth/usecases/AuthUseCases';
import {LoginCredentials} from '@domain/repositories/IAuthRepository';
import {AuthStackParamList} from '@app/navigation/types';
import {mapAxiosError} from '@shared/helpers/errorHandler';
import {useAppDispatch} from '@store/redux/hooks';
import {setAuthenticated} from '@store/slices/authSlice';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export interface LoginFormValues {
  email: string;
  password: string;
}

export const useLoginViewModel = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProp>();
  const loginUseCase = useMemo(() => new LoginUseCase(authRepository), []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isBiometricEnabled = featureFlagService.isEnabled('biometric_login');

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const session = await loginUseCase.execute(credentials);
        dispatch(setAuthenticated({user: session.user}));
      } catch (err) {
        setError(mapAxiosError(err).message);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, loginUseCase],
  );

  const loginWithBiometrics = useCallback(async () => {
    if (!isBiometricEnabled) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Placeholder — integrate react-native-biometrics / Keychain retrieval here.
      const user = await authRepository.getCurrentUser();
      if (user) {
        dispatch(setAuthenticated({user}));
      } else {
        setError('Biometric login is not configured yet.');
      }
    } catch (err) {
      setError(mapAxiosError(err).message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, isBiometricEnabled]);

  const navigateToSignup = useCallback(() => {
    navigation.navigate(NAVIGATION.SIGNUP);
  }, [navigation]);

  const navigateToForgotPassword = useCallback(() => {
    navigation.navigate(NAVIGATION.FORGOT_PASSWORD);
  }, [navigation]);

  return {
    login,
    loginWithBiometrics,
    isBiometricEnabled,
    isLoading,
    error,
    navigateToSignup,
    navigateToForgotPassword,
  };
};
