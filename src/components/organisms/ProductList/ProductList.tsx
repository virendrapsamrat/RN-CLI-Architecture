import React, {memo, useCallback, useMemo} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useTheme} from '@app/providers/ThemeProvider';
import {Text} from '@components/atoms/Text/Text';
import {Image} from '@components/atoms/Image/Image';
import {Card} from '@components/molecules/Card/Card';
import {Loader} from '@components/atoms/Loader/Loader';

export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
  description?: string;
}

export interface ProductListProps {
  products: Product[];
  loading?: boolean;
  onProductPress?: (product: Product) => void;
  ListEmptyComponent?: React.ReactElement;
}

export const ProductList = memo<ProductListProps>(
  ({products, loading = false, onProductPress, ListEmptyComponent}) => {
    const {theme} = useTheme();

    const itemStyle = useMemo(
      () => ({
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        gap: theme.spacing.md,
      }),
      [theme],
    );

    const imageSize = theme.responsiveSizes.iconSize.xl + theme.spacing.lg;

    const renderItem: ListRenderItem<Product> = useCallback(
      ({item}) => {
        const content = (
          <Card style={{marginBottom: theme.spacing.md}}>
            <View style={itemStyle}>
              <Image
                source={{uri: item.imageUrl ?? ''}}
                style={{
                  width: imageSize,
                  height: imageSize,
                  borderRadius: theme.radius.md,
                }}
              />
              <View style={styles.info}>
                <Text variant="body" numberOfLines={1}>
                  {item.name}
                </Text>
                {item.description && (
                  <Text
                    variant="bodySmall"
                    color={theme.colors.textSecondary}
                    numberOfLines={2}>
                    {item.description}
                  </Text>
                )}
                <Text variant="label" color={theme.colors.primary}>
                  {item.price}
                </Text>
              </View>
            </View>
          </Card>
        );

        if (onProductPress) {
          return (
            <Pressable
              onPress={() => onProductPress(item)}
              accessibilityRole="button"
              accessibilityLabel={item.name}>
              {content}
            </Pressable>
          );
        }

        return content;
      },
      [theme, itemStyle, imageSize, onProductPress],
    );

    const keyExtractor = useCallback((item: Product) => item.id, []);

    const emptyStyle = useMemo(
      () => ({
        textAlign: 'center' as const,
        paddingVertical: theme.spacing.xxl,
      }),
      [theme],
    );

    if (loading) {
      return <Loader />;
    }

    return (
      <FlashList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{padding: theme.spacing.lg}}
        ListEmptyComponent={
          ListEmptyComponent ?? (
            <Text variant="body" color={theme.colors.textSecondary} style={emptyStyle}>
              No products found
            </Text>
          )
        }
      />
    );
  },
);

ProductList.displayName = 'ProductList';

const styles = StyleSheet.create({
  info: {
    flex: 1,
  },
});
