import {darkColors, lightColors, ThemeColors} from './colors';
import {typography} from './typography';
import {spacing, borderWidth} from './spacing';
import {radius} from './radius';
import {elevation} from './elevation';
import {shadow} from './shadow';
import {animation, opacity} from './animation';
import {breakpoints, responsiveSizes} from './breakpoints';
import {zIndex} from './zIndex';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderWidth: typeof borderWidth;
  radius: typeof radius;
  elevation: typeof elevation;
  shadow: typeof shadow;
  animation: typeof animation;
  opacity: typeof opacity;
  breakpoints: typeof breakpoints;
  responsiveSizes: typeof responsiveSizes;
  zIndex: typeof zIndex;
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: lightColors,
  typography,
  spacing,
  borderWidth,
  radius,
  elevation,
  shadow,
  animation,
  opacity,
  breakpoints,
  responsiveSizes,
  zIndex,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: darkColors,
  typography,
  spacing,
  borderWidth,
  radius,
  elevation,
  shadow,
  animation,
  opacity,
  breakpoints,
  responsiveSizes,
  zIndex,
};

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './elevation';
export * from './shadow';
export * from './animation';
export * from './breakpoints';
export * from './zIndex';
