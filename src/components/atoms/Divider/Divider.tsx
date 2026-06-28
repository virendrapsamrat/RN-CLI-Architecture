import React, {memo, useMemo} from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends ViewProps {
  orientation?: DividerOrientation;
  spacing?: number;
}

export const Divider = memo<DividerProps>(
  ({orientation = 'horizontal', spacing, style, ...props}) => {
    const {theme} = useTheme();

    const dividerStyle = useMemo(() => {
      const margin = spacing ?? theme.spacing.none;
      const base = {
        backgroundColor: theme.colors.divider,
      };

      if (orientation === 'vertical') {
        return {
          ...base,
          width: theme.borderWidth.thin,
          alignSelf: 'stretch' as const,
          marginHorizontal: margin,
        };
      }

      return {
        ...base,
        height: theme.borderWidth.thin,
        width: '100%' as const,
        marginVertical: margin,
      };
    }, [theme, orientation, spacing]);

    return (
      <View
        style={[dividerStyle, style]}
        accessibilityRole="none"
        importantForAccessibility="no"
        {...props}
      />
    );
  },
);

Divider.displayName = 'Divider';
