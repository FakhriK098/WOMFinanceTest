import { StyleSheet, View } from 'react-native';
import React from 'react';
import { EmptyListProps } from '../../types/components';
import { typography } from '../../theme/typography';
import Text from '../atoms/Text';
import { colors } from '../../theme/colors';

const EmptyList = ({ isDark, message }: EmptyListProps) => (
  <View style={styles.empty}>
    <Text
      size={typography.sm}
      color={isDark ? colors.text.mutedDark : colors.text.mutedLight}
    >
      {message ?? 'Belum ada data'}
    </Text>
  </View>
);

export default EmptyList;

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
