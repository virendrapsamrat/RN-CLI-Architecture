import React, {memo, useMemo} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Icon} from '@components/atoms/Icon/Icon';
import {Divider} from '@components/atoms/Divider/Divider';

export interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  showDivider?: boolean;
}

export const ModalHeader = memo<ModalHeaderProps>(
  ({title, onClose, showDivider = true}) => {
    const {theme} = useTheme();

    const containerStyle = useMemo(
      () => ({
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
      }),
      [theme],
    );

    return (
      <View>
        <View style={[containerStyle, styles.row]}>
          <Text variant="h3" style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {onClose && (
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close">
              <Icon name="close" size={theme.responsiveSizes.iconSize.md} />
            </Pressable>
          )}
        </View>
        {showDivider && <Divider />}
      </View>
    );
  },
);

ModalHeader.displayName = 'ModalHeader';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
});
