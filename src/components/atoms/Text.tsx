import React from 'react'
import { Text as RNText } from 'react-native'
import type { TextAtomProps } from '@typings/components'
import { weight as fontWeight } from '@theme/typography'

const Text = ({ children, weight = 'regular', color, size = 16, style, ...rest }: TextAtomProps) => {
  return (
    <RNText
      {...rest}
      style={[{ fontSize: size, color, fontWeight: weight === 'bold' ? fontWeight.bold : weight === 'medium' ? fontWeight.medium : fontWeight.regular }, style]}
    >
      {children}
    </RNText>
  )
}

export default React.memo(Text)
