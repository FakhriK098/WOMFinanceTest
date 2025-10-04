import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { spacing } from '@theme/spacing'

type Props = { sprites: string[] }

const SpriteGrid = ({ sprites }: Props) => {
  return (
    <View style={styles.grid}>
      {sprites.map((s, i) => (
        <Image key={`${s}-${i}`} source={{ uri: s }} style={styles.img} resizeMode="contain" />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  img: {
    width: 72,
    height: 72,
  },
})

export default React.memo(SpriteGrid)
