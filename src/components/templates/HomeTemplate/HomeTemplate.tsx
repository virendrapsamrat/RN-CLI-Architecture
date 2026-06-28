import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@app/providers/ThemeProvider';
import {HomeHeader, HomeHeaderProps} from '@components/organisms/HomeHeader/HomeHeader';

export interface HomeTemplateProps extends HomeHeaderProps {
  children: React.ReactNode;
}

export const HomeTemplate = memo<HomeTemplateProps>(({children, ...headerProps}) => {
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
      <HomeHeader {...headerProps} />
      <View style={styles.content}>{children}</View>
    </View>
  );
});

HomeTemplate.displayName = 'HomeTemplate';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
