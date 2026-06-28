import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Loader} from '@components/atoms/Loader/Loader';
import {Text} from '@components/atoms/Text/Text';
import {useTheme} from '@app/providers/ThemeProvider';
import {authRepository} from '@features/auth/repository/AuthRepository';
import {GetCurrentUserUseCase} from '@features/auth/usecases/AuthUseCases';
import {useAppDispatch} from '@store/redux/hooks';
import {setAuthenticated, setUnauthenticated} from '@store/slices/authSlice';

export const SplashScreen = () => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const getCurrentUser = new GetCurrentUserUseCase(authRepository);
        const user = await getCurrentUser.execute();

        if (user) {
          dispatch(setAuthenticated({user}));
        } else {
          dispatch(setUnauthenticated());
        }
      } catch {
        dispatch(setUnauthenticated());
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text variant="h2">{t('common.appName')}</Text>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
