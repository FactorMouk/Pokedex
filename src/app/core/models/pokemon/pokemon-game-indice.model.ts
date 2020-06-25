import { DeserializableModel } from '../deserializable.model';
import { ReferenceModel } from '../reference.model';

// Modelo de objeto GameIndice retornado em objeto Pokémon pela API
export class PokemonGameIndiceModel implements DeserializableModel {
  game_index: number;
  version: ReferenceModel;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.version = new ReferenceModel().deserialize(input['version']);
    return this;
  }
}
