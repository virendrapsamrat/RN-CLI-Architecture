import React, {memo, useState, useCallback} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';
import {useTheme} from '@app/providers/ThemeProvider';
import {Icon} from '@components/atoms/Icon/Icon';

export interface ImageProps extends Omit<FastImageProps, 'source'> {
  source: Source;
  fallbackIcon?: string;
  containerStyle?: ViewStyle;
}

export const Image = memo<ImageProps>(
  ({
    source,
    fallbackIcon = 'image-outline',
    style,
    containerStyle,
    onError,
    ...props
  }) => {
    const {theme} = useTheme();
    const [hasError, setHasError] = useState(false);

    const handleError = useCallback(() => {
      setHasError(true);
      onError?.();
    }, [onError]);

    if (hasError) {
      return (
        <View
          style={[
            styles.fallback,
            {
              backgroundColor: theme.colors.surfaceSecondary,
              borderRadius: theme.radius.sm,
            },
            containerStyle,
            style as ViewStyle,
          ]}
          accessibilityRole="image"
          accessibilityLabel="Image unavailable">
          <Icon
            name={fallbackIcon}
            size={theme.responsiveSizes.iconSize.lg}
            color={theme.colors.textTertiary}
          />
        </View>
      );
    }

    return (
      <FastImage
        source={source}
        style={style}
        onError={handleError}
        resizeMode={FastImage.resizeMode.cover}
        {...props}
      />
    );
  },
);

Image.displayName = 'Image';

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
