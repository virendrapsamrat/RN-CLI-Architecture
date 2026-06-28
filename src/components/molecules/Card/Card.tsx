import React, {memo, useMemo} from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';

export interface CardProps extends ViewProps {
  elevated?: boolean;
  padded?: boolean;
}

export const Card = memo<CardProps>(
  ({elevated = true, padded = true, style, children, ...props}) => {
    const {theme} = useTheme();

    const cardStyle = useMemo(
      () => ({
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        borderWidth: theme.borderWidth.thin,
        borderColor: theme.colors.border,
        padding: padded ? theme.spacing.lg : theme.spacing.none,
        ...(elevated ? theme.shadow.sm : {}),
      }),
      [theme, elevated, padded],
    );

    return (
      <View style={[cardStyle, style]} accessibilityRole="none" {...props}>
        {children}
      </View>
    );
  },
);

Card.displayName = 'Card';
