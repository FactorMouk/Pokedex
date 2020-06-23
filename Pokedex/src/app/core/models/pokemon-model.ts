export class PokemonModel {
  id: string;
  name: string;
  img: string;
  types: string[];
  height: number;
  weight: number;
  stats: number[];
  abilities: string[];
  base_experience: number;
  forms: [];
  game_indices: [];
  held_items: [];
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  order: number;
  species: {};
  sprites: {};
  constructor(
    id: string = null,
    name: string = null,
    img: string = null,
    types: string[] = null,
    height: number = null,
    weight: number = null,
    stats: number[] = null,
    abilities: string[] = null,
    base_experience: number = null,
    forms: [] = null,
    game_indices: [] = null,
    held_items: [] = null,
    is_default: boolean = null,
    location_area_encounters: string = null,
    moves: [] = null,
    order: number = null,
    species: {} = null,
    sprites: {} = null
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.types = types;
    this.height = height;
    this.weight = weight;
    this.stats = stats;
    this.abilities = abilities;
    this.base_experience = base_experience;
    this.forms = forms;
    this.game_indices = game_indices;
    this.held_items = held_items;
    this.is_default = is_default;
    this.location_area_encounters = location_area_encounters;
    this.moves = moves;
    this.order = order;
    this.species = species;
    this.sprites = sprites;
  }
}
