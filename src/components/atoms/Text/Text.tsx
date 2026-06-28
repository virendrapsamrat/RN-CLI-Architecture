import React, {memo} from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {TypographyVariant} from '@app/theme';

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: string;
}

export const Text = memo<TextProps>(
  ({variant = 'body', color, style, children, ...props}) => {
    const {theme} = useTheme();

    return (
      <RNText
        style={[theme.typography[variant], {color: color ?? theme.colors.text}, style]}
        {...props}>
        {children}
      </RNText>
    );
  },
);

Text.displayName = 'Text';
