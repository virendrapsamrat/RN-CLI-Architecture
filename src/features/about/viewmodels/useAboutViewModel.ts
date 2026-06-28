import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';

export const useAboutViewModel = () => {
  const {t} = useTranslation();

  const appVersion = useMemo(() => DeviceInfo.getVersion(), []);
  const buildNumber = useMemo(() => DeviceInfo.getBuildNumber(), []);

  const highlights = useMemo(
    () => [
      'Clean Architecture with domain-driven design',
      'MVVM presentation layer with ViewModel hooks',
      'Atomic Design component system',
      'Redux Toolkit for global state',
      'i18n support with react-i18next',
    ],
    [],
  );

  return {
    title: t('about.title'),
    description: t('about.description'),
    appName: t('common.appName'),
    appVersion,
    buildNumber,
    highlights,
  };
};
