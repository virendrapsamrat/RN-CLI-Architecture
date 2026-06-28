export const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
} as const;

export const responsiveSizes = {
  containerPadding: {
    phone: 16,
    tablet: 24,
    desktop: 32,
  },
  maxContentWidth: {
    phone: 480,
    tablet: 768,
    desktop: 1200,
  },
  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
} as const;

export type Breakpoint = keyof typeof breakpoints;
