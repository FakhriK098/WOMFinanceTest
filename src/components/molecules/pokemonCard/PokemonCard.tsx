import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native';
import Text from '@components/atoms/text/Text';
import type { PokemonListItem } from '@typings/pokemon';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { radius } from '@theme/radius';
import { typography } from '@theme/typography';
import Spacer from '@components/atoms/spacer/Spacer';
import { tintFromHex } from '@utils/pokemon';

type Props = { item: PokemonListItem; onPress?: () => void };

const PokemonCard = ({ item, onPress }: Props) => {
  const isDark = useColorScheme() === 'dark';
  const containerStyle = useMemo(
    () => [
      styles.card,
      {
        backgroundColor: tintFromHex(item.color, 0.15),
        borderColor: item.color,
      },
    ],
    [item.color],
  );
  const nameColor = isDark ? colors.text.dark : colors.text.light;
  const typeColor = isDark ? colors.text.mutedDark : colors.text.mutedLight;
  return (
    <Pressable style={containerStyle} onPress={onPress}>
      {!!item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Spacer size={spacing.sm} />
      <Text weight="bold" size={typography.sm} color={nameColor}>
        {item.name}
      </Text>
      <Text size={typography.xs} color={typeColor}>
        {item.types.join(' • ')}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.sm / 2,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 100,
  },
});

export default React.memo(PokemonCard);
