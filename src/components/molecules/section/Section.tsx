import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '@components/atoms/text/Text';
import { typography } from '@theme/typography';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

type Props = {
  title: string;
  isDark: boolean;
  children: React.ReactNode;
};

const Section = ({ title, isDark, children }: Props) => {
  return (
    <View style={styles.container}>
      <Text
        weight="bold"
        size={typography.lg}
        color={isDark ? colors.text.dark : colors.text.light}
      >
        {title}
      </Text>
      <View style={styles.gap} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: spacing.xl },
  gap: { height: spacing.sm },
});

export default React.memo(Section);
