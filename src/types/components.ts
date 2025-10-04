import type { TextProps } from 'react-native'
import type { PressableProps } from 'react-native'
import type { TextInputProps } from 'react-native'

export type TextAtomProps = TextProps & {
  weight?: 'regular' | 'medium' | 'bold'
  color?: string
  size?: number
}

export type ButtonAtomProps = PressableProps & {
  title: string
  loading?: boolean
  disabled?: boolean
}

export type InputAtomProps = TextInputProps & {
  error?: boolean
}

export type FormFieldProps = {
  label: string
  placeholder?: string
  value: string
  onChangeText: (t: string) => void
  secureTextEntry?: boolean
  errorText?: string | null
  keyboardType?: 'default' | 'email-address'
}

export type LoginFormProps = {
  onSubmit: (email: string, password: string) => void
  loading?: boolean
  error?: string | null
}

export type AuthTemplateProps = {
  title: string
  children: React.ReactNode
}
