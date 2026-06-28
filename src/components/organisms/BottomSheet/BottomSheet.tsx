import React, {memo, useMemo, useCallback, forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheetLib, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@app/providers/ThemeProvider';

export interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  index?: number;
  onClose?: () => void;
  enablePanDownToClose?: boolean;
}

export const BottomSheet = memo(
  forwardRef<BottomSheetLib, BottomSheetProps>(
    (
      {
        children,
        snapPoints = ['25%', '50%'],
        index = -1,
        onClose,
        enablePanDownToClose = true,
      },
      ref,
    ) => {
      const {theme} = useTheme();

      const backgroundStyle = useMemo(
        () => ({
          backgroundColor: theme.colors.card,
          borderTopLeftRadius: theme.radius.xl,
          borderTopRightRadius: theme.radius.xl,
        }),
        [theme],
      );

      const handleIndicatorStyle = useMemo(
        () => ({
          backgroundColor: theme.colors.textTertiary,
          width: theme.spacing.xxxl,
        }),
        [theme],
      );

      const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={theme.opacity.overlay}
          />
        ),
        [theme.opacity.overlay],
      );

      const handleChange = useCallback(
        (sheetIndex: number) => {
          if (sheetIndex === -1) {
            onClose?.();
          }
        },
        [onClose],
      );

      return (
        <BottomSheetLib
          ref={ref}
          index={index}
          snapPoints={snapPoints}
          enablePanDownToClose={enablePanDownToClose}
          backdropComponent={renderBackdrop}
          backgroundStyle={backgroundStyle}
          handleIndicatorStyle={handleIndicatorStyle}
          onChange={handleChange}>
          <BottomSheetView style={[styles.content, {padding: theme.spacing.lg}]}>
            {children}
          </BottomSheetView>
        </BottomSheetLib>
      );
    },
  ),
);

BottomSheet.displayName = 'BottomSheet';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
