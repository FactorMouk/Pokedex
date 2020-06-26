import { ReferenceModel } from './../reference.model';
import { NamesModel } from './../names.model';
import { TypeDamageRelationsModel } from './type-damage-relations.model';
import { TypeGameIndiceModel } from './type-game-indice.model';
import { TypePokemonModel } from './type-pokemon.model';

// Modelo de objeto Type retornado pela API
export class TypeModel {
  damage_relations: TypeDamageRelationsModel;
  game_indices: TypeGameIndiceModel[];
  generation: ReferenceModel;
  id: number;
  move_damage_class: ReferenceModel;
  moves: ReferenceModel[];
  name: string;
  names: NamesModel[];
  pokemon: TypePokemonModel[];
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.damage_relations = new TypeDamageRelationsModel().deserialize(
      input['damage_relations']
    );
    this.game_indices = [];
    input['game_indices'].forEach((game_indice: TypeGameIndiceModel) => {
      this.game_indices.push(
        new TypeGameIndiceModel().deserialize(game_indice)
      );
    });
    this.generation = new ReferenceModel().deserialize(input['generation']);
    this.move_damage_class = new ReferenceModel().deserialize(
      input['move_damage_class']
    );
    this.moves = [];
    input['moves'].forEach((move: ReferenceModel) => {
      this.moves.push(new ReferenceModel().deserialize(move));
    });
    this.names = [];
    input['names'].forEach((name: NamesModel) => {
      this.names.push(new NamesModel().deserialize(name));
    });
    this.pokemon = [];
    input['pokemon'].forEach((pokemon: TypePokemonModel) => {
      this.pokemon.push(new TypePokemonModel().deserialize(pokemon));
    });
    return this;
  }
}
