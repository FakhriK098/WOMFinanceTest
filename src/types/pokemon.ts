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
