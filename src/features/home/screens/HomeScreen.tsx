import React, {memo, useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useTheme} from '@app/providers/ThemeProvider';
import {HomeTemplate} from '@components/templates/HomeTemplate/HomeTemplate';
import {Text} from '@components/atoms/Text/Text';
import {Card} from '@components/molecules/Card/Card';
import {HomeFeedItem, useHomeViewModel} from '@features/home/viewmodels/useHomeViewModel';

export const HomeScreen = memo(() => {
  const {theme} = useTheme();
  const {
    greeting,
    userName,
    avatarUrl,
    searchQuery,
    feedItems,
    handleSearchChange,
    handleSearchClear,
    handleNotificationPress,
    handleProfilePress,
  } = useHomeViewModel();

  const contentStyle = useMemo(
    () => ({
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
    }),
    [theme],
  );

  const renderItem: ListRenderItem<HomeFeedItem> = useCallback(
    ({item}) => (
      <Card style={{marginBottom: theme.spacing.md}}>
        <Text variant="body">{item.title}</Text>
        <Text variant="bodySmall" color={theme.colors.textSecondary}>
          {item.subtitle}
        </Text>
      </Card>
    ),
    [theme],
  );

  const keyExtractor = useCallback((item: HomeFeedItem) => item.id, []);

  return (
    <HomeTemplate
      userName={userName}
      avatarUrl={avatarUrl}
      greeting={greeting}
      searchValue={searchQuery}
      onSearchChange={handleSearchChange}
      onSearchClear={handleSearchClear}
      onNotificationPress={handleNotificationPress}
      onProfilePress={handleProfilePress}>
      <View style={styles.listContainer}>
        <FlashList
          data={feedItems}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </HomeTemplate>
  );
});

HomeScreen.displayName = 'HomeScreen';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});
