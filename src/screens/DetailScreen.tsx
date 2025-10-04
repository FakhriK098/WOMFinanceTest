import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  Text,
  Chip,
  SpriteGrid,
  EvolutionList,
  InfoRow,
  Section,
} from '@components';
import { RootState, AppDispatch } from '@store';
import {
  fetchPokemonDetail,
  clearDetail,
} from '@store/slices/pokemonDetailSlice';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { typography } from '@theme/typography';
import type { RootStackParamList } from '@typings/navigation';

const DetailScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const navigation = useNavigation();
  const { data, loading, error } = useSelector(
    (s: RootState) => s.pokemonDetail,
  );
  const isDark = useColorScheme() === 'dark';
  const id = route.params?.id;

  useEffect(() => {
    if (id) dispatch(fetchPokemonDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    navigation.setOptions({
      title: data?.name ? data.name : 'Detail',
      headerStyle: {
        backgroundColor: isDark
          ? colors.background.dark
          : colors.background.light,
      },
      headerTintColor: isDark ? colors.text.dark : colors.text.light,
    });
  }, [navigation, data?.name, isDark]);

  if (loading && !data) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor: isDark
              ? colors.background.dark
              : colors.background.light,
          },
        ]}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor: isDark
              ? colors.background.dark
              : colors.background.light,
          },
        ]}
      >
        <Text
          size={typography.sm}
          color={isDark ? colors.text.mutedDark : colors.text.mutedLight}
        >
          {error}
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor: isDark
              ? colors.background.dark
              : colors.background.light,
          },
        ]}
      >
        <Text
          size={typography.sm}
          color={isDark ? colors.text.mutedDark : colors.text.mutedLight}
        >
          Tidak ada data
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.background.dark
            : colors.background.light,
        },
      ]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {!!data.image && (
        <Image
          source={{ uri: data.image }}
          style={[styles.hero, { borderColor: data.color }]}
          resizeMode="contain"
        />
      )}
      <View style={styles.section}>
        <Text
          weight="bold"
          size={typography.xxl}
          color={isDark ? colors.text.dark : colors.text.light}
        >
          {data.name}
        </Text>
        <View style={styles.rowWrap}>
          {data.types.map(t => (
            <Chip
              key={t}
              label={t}
              color={data.color}
              textColor={colors.white}
            />
          ))}
        </View>
      </View>

      <Section title="Informasi" isDark={isDark}>
        <InfoRow label="Tinggi" value={data.height} isDark={isDark} />
        <InfoRow label="Berat" value={data.weight} isDark={isDark} />
        <InfoRow label="Base XP" value={data.base_experience} isDark={isDark} />
      </Section>

      <Section title="Abilities" isDark={isDark}>
        <View style={styles.rowWrap}>
          {data.abilities.map(a => (
            <Chip
              key={a}
              label={a}
              color={data.color}
              textColor={colors.white}
            />
          ))}
        </View>
      </Section>

      {data.sprites.length > 0 && (
        <Section title="Sprites" isDark={isDark}>
          <SpriteGrid sprites={data.sprites} />
        </Section>
      )}

      {data.evolutions.length > 0 && (
        <Section title="Evolutions" isDark={isDark}>
          <EvolutionList
            items={data.evolutions}
            onPressItem={nid => dispatch(fetchPokemonDetail(nid))}
          />
        </Section>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.lg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: {
    width: '100%',
    height: 180,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  section: { marginBottom: spacing.xl },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});

export default DetailScreen;
