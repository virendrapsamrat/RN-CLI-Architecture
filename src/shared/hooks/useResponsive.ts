import {useWindowDimensions} from 'react-native';
import {breakpoints} from '@app/theme';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export type DeviceType = 'phone' | 'tablet';

export const useResponsive = () => {
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = width >= breakpoints.tablet;
  const deviceType: DeviceType = isTablet ? 'tablet' : 'phone';

  return {
    width,
    height,
    isLandscape,
    isTablet,
    deviceType,
    scale: (size: number) => scale(size),
    verticalScale: (size: number) => verticalScale(size),
    moderateScale: (size: number, factor?: number) => moderateScale(size, factor),
  };
};
