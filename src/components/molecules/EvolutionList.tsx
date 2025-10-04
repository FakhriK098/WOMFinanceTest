import React, { useCallback } from 'react';
import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import Text from '../atoms/Text';
import type { EvolutionEntry } from '@typings/pokemon';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';

type Props = {
  items: EvolutionEntry[];
  onPressItem: (id: number) => void;
};

const EvolutionList = ({ items, onPressItem }: Props) => {
  const renderItem = useCallback(
    ({ item }: { item: EvolutionEntry }) => (
      <Pressable style={styles.card} onPress={() => onPressItem(item.id)}>
        {!!item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.img}
            resizeMode="contain"
          />
        )}
        <Text size={typography.xs} color={colors.text.light}>
          {item.name}
        </Text>
      </Pressable>
    ),
    [onPressItem],
  );
  return (
    <FlatList
      data={items}
      horizontal
      keyExtractor={it => String(it.id)}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  card: {
    width: 100,
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
  },
  img: {
    width: 72,
    height: 72,
    marginBottom: spacing.xs,
  },
});

export default React.memo(EvolutionList);
