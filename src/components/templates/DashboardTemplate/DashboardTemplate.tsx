import React, {memo, useMemo} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@app/providers/ThemeProvider';
import {Header, HeaderProps} from '@components/molecules/Header/Header';
import {Spacer} from '@components/atoms/Spacer/Spacer';

export interface DashboardTemplateProps extends HeaderProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const DashboardTemplate = memo<DashboardTemplateProps>(
  ({children, sidebar, ...headerProps}) => {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();

    const containerStyle = useMemo(
      () => ({
        flex: 1,
        backgroundColor: theme.colors.surface,
        paddingBottom: insets.bottom,
      }),
      [theme, insets.bottom],
    );

    const contentStyle = useMemo(
      () => ({
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
      }),
      [theme],
    );

    return (
      <View style={containerStyle}>
        <Header {...headerProps} />
        <View style={styles.body}>
          {sidebar && (
            <View
              style={{
                width: theme.responsiveSizes.maxContentWidth.phone / 3,
                borderRightWidth: theme.borderWidth.thin,
                borderRightColor: theme.colors.border,
                padding: theme.spacing.lg,
              }}>
              {sidebar}
            </View>
          )}
          <ScrollView
            style={styles.main}
            contentContainerStyle={contentStyle}
            showsVerticalScrollIndicator={false}>
            {children}
            <Spacer size="xl" />
          </ScrollView>
        </View>
      </View>
    );
  },
);

DashboardTemplate.displayName = 'DashboardTemplate';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  main: {
    flex: 1,
  },
});
