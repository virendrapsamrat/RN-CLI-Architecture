import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import i18n from '@app/localization';
import {STORAGE_KEYS} from '@app/constants';
import {storageService} from '@app/storage';
import {ThemeMode} from '@app/theme';
import {LogoutUseCase} from '@features/auth/usecases/AuthUseCases';
import {authRepository} from '@features/auth/repository/AuthRepository';
import {useAppDispatch, useAppSelector} from '@store/redux/hooks';
import {selectApp, setLanguage, setThemeMode} from '@store/slices/appSlice';
import {setUnauthenticated} from '@store/slices/authSlice';

const logoutUseCase = new LogoutUseCase(authRepository);

export const useSettingsViewModel = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {themeMode, language} = useAppSelector(selectApp);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const stored = storageService.getString(STORAGE_KEYS.BIOMETRIC_ENABLED);
    setIsBiometricEnabled(stored === 'true');
  }, []);

  const isDarkMode = themeMode === 'dark';

  const languageLabel = useMemo(
    () => (language === 'en' ? 'English' : 'Español'),
    [language],
  );

  const toggleTheme = useCallback(() => {
    const nextMode: ThemeMode = isDarkMode ? 'light' : 'dark';
    dispatch(setThemeMode(nextMode));
    storageService.setString(STORAGE_KEYS.THEME_MODE, nextMode);
  }, [dispatch, isDarkMode]);

  const toggleLanguage = useCallback(() => {
    const nextLanguage = language === 'en' ? 'es' : 'en';
    dispatch(setLanguage(nextLanguage));
    storageService.setString(STORAGE_KEYS.LANGUAGE, nextLanguage);
    i18n.changeLanguage(nextLanguage).catch(() => {});
  }, [dispatch, language]);

  const toggleBiometric = useCallback(() => {
    setIsBiometricEnabled(prev => {
      const next = !prev;
      storageService.setString(STORAGE_KEYS.BIOMETRIC_ENABLED, String(next));
      return next;
    });
  }, []);

  const logout = useCallback(async () => {
    if (isLoggingOut) {
      return;
    }
    setIsLoggingOut(true);
    try {
      await logoutUseCase.execute();
      dispatch(setUnauthenticated());
    } finally {
      setIsLoggingOut(false);
    }
  }, [dispatch, isLoggingOut]);

  const appearanceItems = useMemo(
    () => [
      {
        id: 'dark-mode',
        title: t('settings.darkMode'),
        subtitle: isDarkMode ? 'On' : 'Off',
        leftIcon: 'moon-outline',
      },
    ],
    [isDarkMode, t],
  );

  const securityItems = useMemo(
    () => [
      {
        id: 'biometric',
        title: t('settings.biometric'),
        subtitle: isBiometricEnabled ? 'Enabled' : 'Disabled',
        leftIcon: 'finger-print-outline',
      },
    ],
    [isBiometricEnabled, t],
  );

  const preferenceItems = useMemo(
    () => [
      {
        id: 'language',
        title: t('settings.language'),
        subtitle: languageLabel,
        leftIcon: 'language-outline',
        onPress: toggleLanguage,
      },
    ],
    [languageLabel, t, toggleLanguage],
  );

  const accountItems = useMemo(
    () => [
      {
        id: 'logout',
        title: t('settings.logout'),
        leftIcon: 'log-out-outline',
        destructive: true,
        onPress: () => {
          logout().catch(() => {});
        },
      },
    ],
    [logout, t],
  );

  return {
    title: t('settings.title'),
    isDarkMode,
    isBiometricEnabled,
    isLoggingOut,
    appearanceItems,
    securityItems,
    preferenceItems,
    accountItems,
    toggleTheme,
    toggleBiometric,
    toggleLanguage,
    logout,
  };
};
