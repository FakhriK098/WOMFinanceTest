import React, { useState } from 'react'
import { TextInput, StyleSheet, View, useColorScheme } from 'react-native'
import type { InputAtomProps } from '../../types/components'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { radius } from '../../theme/radius'
import { dimensions } from '../../theme/dimensions'

const Input = ({ style, error, secureTextEntry, ...rest }: InputAtomProps) => {
  const isDark = useColorScheme() === 'dark'
  const [focused, setFocused] = useState(false)
  return (
    <View style={[
      styles.wrapper,
      { backgroundColor: isDark ? colors.inputBg.dark : colors.inputBg.light, borderColor: isDark ? colors.border.dark : colors.border.light },
      focused && styles.focused,
      error && styles.error,
    ]}>
      <TextInput
        {...rest}
        style={[styles.input, { color: isDark ? colors.text.dark : colors.text.light }, style]}
        placeholderTextColor={isDark ? colors.text.mutedDark : colors.text.mutedLight}
        onFocus={e => {
          setFocused(true)
          rest.onFocus && rest.onFocus(e)
        }}
        onBlur={e => {
          setFocused(false)
          rest.onBlur && rest.onBlur(e)
        }}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  focused: {
    borderColor: colors.primary,
  },
  error: {
    borderColor: colors.danger,
  },
  input: {
    height: dimensions.controlHeight,
  },
})

export default React.memo(Input)
