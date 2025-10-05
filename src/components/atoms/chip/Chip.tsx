import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '@components/atoms/text/Text';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';

type Props = { label: string; color: string; textColor: string };

const Chip = ({ label, color, textColor }: Props) => {
  return (
    <View style={[styles.base, { backgroundColor: color }]}>
      <Text size={12} color={textColor}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.md,
    alignSelf: 'flex-start',
  },
});

export default React.memo(Chip);
