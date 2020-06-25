import { DeserializableModel } from '../deserializable.model';
// Modelo de objeto Sprites retornado em objeto Pokémon pela API
export class PokemonSpritesModel implements DeserializableModel {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    return this;
  }
}
