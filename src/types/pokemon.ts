export type PokeListItem = {
  name: string
  url: string
}

export type PokemonPageResponse = {
  next: string | null
  results: PokeListItem[]
}

export type PokemonTypeSlot = {
  type: { name: string }
}

export type PokemonSprites = {
  front_default: string | null
  back_default: string | null
  front_shiny: string | null
  back_shiny: string | null
  other?: {
    ['official-artwork']?: {
      front_default: string | null
    }
  }
}

export type PokemonDetailResponse = {
  id: number
  name: string
  sprites: PokemonSprites
  types: PokemonTypeSlot[]
  species: { url: string }
  height: number
  weight: number
  base_experience: number
  abilities: { ability: { name: string } }[]
}

export type PokemonSpeciesResponse = {
  color: { name: string }
  evolution_chain: { url: string }
}

export type PokemonListItem = {
  id: number
  name: string
  image: string | null
  types: string[]
  color: string
}

export type EvolutionChainLink = {
  species: { name: string; url: string }
  evolves_to: EvolutionChainLink[]
}

export type EvolutionChainResponse = {
  chain: EvolutionChainLink
}

export type EvolutionEntry = {
  id: number
  name: string
  image: string | null
}

export type PokemonDetailView = {
  id: number
  name: string
  color: string
  image: string | null
  types: string[]
  height: number
  weight: number
  base_experience: number
  abilities: string[]
  sprites: string[]
  evolutions: EvolutionEntry[]
}
