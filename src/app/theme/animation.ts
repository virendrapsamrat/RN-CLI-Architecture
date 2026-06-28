export const opacity = {
  disabled: 0.4,
  muted: 0.6,
  overlay: 0.5,
  full: 1,
} as const;

export const animation = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

export type AnimationDuration = keyof typeof animation.duration;
