import React, {memo, useMemo} from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Spacing} from '@app/theme';

export interface SpacerProps extends ViewProps {
  size?: Spacing;
  horizontal?: boolean;
  flex?: number;
}

export const Spacer = memo<SpacerProps>(
  ({size = 'md', horizontal = false, flex, style, ...props}) => {
    const {theme} = useTheme();
    const spacingValue = theme.spacing[size];

    const spacerStyle = useMemo(() => {
      if (flex !== undefined) {
        return {flex};
      }
      return horizontal ? {width: spacingValue} : {height: spacingValue};
    }, [flex, horizontal, spacingValue]);

    return <View style={[spacerStyle, style]} {...props} />;
  },
);

Spacer.displayName = 'Spacer';
