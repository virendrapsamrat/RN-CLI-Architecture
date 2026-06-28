import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@store/redux/hooks';
import {selectCurrentUser} from '@store/slices/authSlice';

export const useProfileViewModel = () => {
  const {t} = useTranslation();
  const user = useAppSelector(selectCurrentUser);

  const displayName = useMemo(() => {
    if (!user) {
      return 'Guest User';
    }
    return `${user.firstName} ${user.lastName}`.trim() || user.email;
  }, [user]);

  const stats = useMemo(
    () => [
      {label: 'Projects', value: '12'},
      {label: 'Tasks', value: '48'},
      {label: 'Teams', value: '3'},
    ],
    [],
  );

  const handleEditProfile = useCallback(() => {
    // Edit profile navigation wired at navigator level
  }, []);

  return {
    title: t('profile.title'),
    editProfileLabel: t('profile.editProfile'),
    name: displayName,
    email: user?.email,
    avatarUrl: user?.avatarUrl,
    badgeLabel: user ? 'Member' : undefined,
    stats,
    handleEditProfile,
  };
};
