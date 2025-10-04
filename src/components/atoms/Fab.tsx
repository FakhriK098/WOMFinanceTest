import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radius } from '../../theme/radius';
import { FABProps } from '../../types/components';

const Fab = ({
  onPress,
  icon,
  style,
  backgroundColor = colors.primary,
  tintColor = colors.white,
}: FABProps) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.base, { backgroundColor }, style]}
    >
      <Image
        source={icon}
        style={[styles.icon, { tintColor }]}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    padding: spacing.sm,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default React.memo(Fab);
