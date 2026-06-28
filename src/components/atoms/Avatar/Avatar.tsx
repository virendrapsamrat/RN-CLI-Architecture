import React, {memo, useMemo, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Image} from '@components/atoms/Image/Image';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  uri?: string;
  name?: string;
  size?: AvatarSize;
}

const getInitials = (name?: string): string => {
  if (!name?.trim()) {
    return '?';
  }
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};

export const Avatar = memo<AvatarProps>(({uri, name, size = 'md'}) => {
  const {theme} = useTheme();
  const [imageFailed, setImageFailed] = useState(false);

  const dimension = useMemo(() => {
    const sizes: Record<AvatarSize, number> = {
      sm: theme.responsiveSizes.iconSize.md,
      md: theme.responsiveSizes.iconSize.lg,
      lg: theme.responsiveSizes.iconSize.xl,
      xl: theme.responsiveSizes.iconSize.xl + theme.spacing.lg,
    };
    return sizes[size];
  }, [theme, size]);

  const containerStyle = useMemo(
    () => ({
      width: dimension,
      height: dimension,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.primaryLight,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      overflow: 'hidden' as const,
    }),
    [theme, dimension],
  );

  const handleImageError = useCallback(() => {
    setImageFailed(true);
  }, []);

  const showImage = Boolean(uri) && !imageFailed;
  const initials = getInitials(name);
  const accessibilityLabel = name ? `Avatar for ${name}` : 'Avatar';

  return (
    <View
      style={containerStyle}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}>
      {showImage ? (
        <Image
          source={{uri: uri!}}
          style={styles.image}
          onError={handleImageError}
          accessibilityLabel={accessibilityLabel}
        />
      ) : (
        <Text
          variant={size === 'sm' ? 'caption' : 'label'}
          color={theme.colors.primary}
          accessibilityLabel={initials}>
          {initials}
        </Text>
      )}
    </View>
  );
});

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
