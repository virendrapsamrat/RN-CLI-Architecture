import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@app/providers/ThemeProvider';
import {Header, HeaderProps} from '@components/molecules/Header/Header';

export interface MainTemplateProps extends HeaderProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const MainTemplate = memo<MainTemplateProps>(
  ({children, footer, ...headerProps}) => {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();

    const containerStyle = useMemo(
      () => ({
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingBottom: insets.bottom,
      }),
      [theme, insets.bottom],
    );

    return (
      <View style={containerStyle}>
        <Header {...headerProps} />
        <View style={styles.content}>{children}</View>
        {footer && (
          <View
            style={{
              paddingHorizontal: theme.spacing.lg,
              paddingVertical: theme.spacing.md,
              borderTopWidth: theme.borderWidth.thin,
              borderTopColor: theme.colors.border,
            }}>
            {footer}
          </View>
        )}
      </View>
    );
  },
);

MainTemplate.displayName = 'MainTemplate';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
