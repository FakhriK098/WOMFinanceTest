import { colors } from '../theme/colors'

const colorMap: Record<string, string> = {
  black: '#111827',
  blue: '#3B82F6',
  brown: '#92400E',
  gray: '#6B7280',
  green: '#10B981',
  pink: '#EC4899',
  purple: '#8B5CF6',
  red: '#EF4444',
  white: '#F3F4F6',
  yellow: '#F59E0B',
}

export const getSpeciesColor = (name: string | undefined) => {
  if (!name) return colors.primary
  return colorMap[name] || colors.primary
}

export const extractIdFromUrl = (url: string) => {
  const m = url.match(/\/(\d+)\/?$/)
  return m ? Number(m[1]) : null
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const tintFromHex = (hex: string, alpha: number) => {
  const h = hex.replace('#', '')
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
