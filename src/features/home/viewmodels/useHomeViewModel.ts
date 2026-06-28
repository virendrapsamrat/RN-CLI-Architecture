import {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@store/redux/hooks';
import {selectCurrentUser} from '@store/slices/authSlice';

export interface HomeFeedItem {
  id: string;
  title: string;
  subtitle: string;
}

export const useHomeViewModel = () => {
  const {t} = useTranslation();
  const user = useAppSelector(selectCurrentUser);
  const [searchQuery, setSearchQuery] = useState('');

  const userName = useMemo(() => {
    if (!user) {
      return 'Guest';
    }
    return `${user.firstName} ${user.lastName}`.trim() || user.email;
  }, [user]);

  const feedItems = useMemo<HomeFeedItem[]>(
    () => [
      {
        id: '1',
        title: 'Clean Architecture',
        subtitle: 'Separation of concerns across layers',
      },
      {
        id: '2',
        title: 'MVVM Pattern',
        subtitle: 'ViewModels handle presentation logic',
      },
      {
        id: '3',
        title: 'Atomic Design',
        subtitle: 'Reusable atoms, molecules, and organisms',
      },
      {
        id: '4',
        title: 'Redux Toolkit',
        subtitle: 'Predictable global state management',
      },
      {
        id: '5',
        title: 'React Navigation',
        subtitle: 'Native stack and tab navigation',
      },
    ],
    [],
  );

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return feedItems;
    }
    return feedItems.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query),
    );
  }, [feedItems, searchQuery]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleNotificationPress = useCallback(() => {
    // Navigation to notifications handled at navigator level when wired
  }, []);

  const handleProfilePress = useCallback(() => {
    // Navigation to profile handled at navigator level when wired
  }, []);

  return {
    title: t('home.title'),
    welcome: t('home.welcome'),
    subtitle: t('home.subtitle'),
    greeting: t('home.welcome'),
    userName,
    avatarUrl: user?.avatarUrl,
    searchQuery,
    feedItems: filteredItems,
    handleSearchChange,
    handleSearchClear,
    handleNotificationPress,
    handleProfilePress,
  };
};
