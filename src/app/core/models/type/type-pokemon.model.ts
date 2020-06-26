import { ReferenceModel } from '../reference.model';

// Modelo de objeto Pokémon de Type retornado pela API
export class TypePokemonModel {
  slot: number;
  pokemon: ReferenceModel;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.pokemon = new ReferenceModel().deserialize(input['pokemon']);
    return this;
  }
}
