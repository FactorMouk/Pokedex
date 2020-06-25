import { DeserializableModel } from './../deserializable.model';
import { ReferenceModel } from './../reference.model';

// Modelo de objeto Stat retornado em objeto Pokémon pela API
export class PokemonStatModel implements DeserializableModel {
  base_stat: number;
  effort: number;
  stat: ReferenceModel;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.stat = new ReferenceModel().deserialize(input['stat']);
    return this;
  }
}
