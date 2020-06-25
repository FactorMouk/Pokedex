import { DeserializableModel } from '../deserializable.model';
import { ReferenceModel } from '../reference.model';

// Modelo de objeto Ability retornado em objeto Pokémon pela API
export class PokemonAbilityModel implements DeserializableModel {
  ability: ReferenceModel;
  is_hidden: boolean;
  slot: number;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.ability = new ReferenceModel().deserialize(input['ability']);
    return this;
  }
}
