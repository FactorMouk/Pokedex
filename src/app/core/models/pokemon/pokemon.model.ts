import { DeserializableModel } from './../deserializable.model';
import { ReferenceModel } from './../reference.model';
import { PokemonTypeModel } from './pokemon-type.model';
import { PokemonStatModel } from './pokemon-stat.model';
import { PokemonAbilityModel } from './pokemon-ability.model';
import { PokemonGameIndiceModel } from './pokemon-game-indice.model';
import { PokemonHeldItemModel } from './pokemon-held-item/pokemon-held-item.model';
import { PokemonMoveModel } from './pokemon-move/pokemon-move.model';
import { PokemonSpritesModel } from './pokemon-sprites.model';

// Modelo de objeto Pokémon retornado pela API
export class PokemonModel implements DeserializableModel {
  id: string;
  name: string;
  img: string;
  types: PokemonTypeModel[];
  height: number;
  weight: number;
  stats: PokemonStatModel[];
  abilities: PokemonAbilityModel[];
  base_experience: number;
  forms: ReferenceModel[];
  game_indices: PokemonGameIndiceModel[];
  held_items: PokemonHeldItemModel[];
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMoveModel[];
  order: number;
  species: ReferenceModel;
  sprites: PokemonSpritesModel;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.types = [];
    input['types'].forEach((type: PokemonTypeModel) => {
      this.types.push(new PokemonTypeModel().deserialize(type));
    });
    this.stats = [];
    input['stats'].forEach((stat: PokemonStatModel) => {
      this.stats.push(new PokemonStatModel().deserialize(stat));
    });
    this.abilities = [];
    input['abilities'].forEach((ability: PokemonAbilityModel) => {
      this.abilities.push(new PokemonAbilityModel().deserialize(ability));
    });
    this.forms = [];
    input['forms'].forEach((form: ReferenceModel) => {
      this.forms.push(new ReferenceModel().deserialize(form));
    });
    this.game_indices = [];
    input['game_indices'].forEach((game_indice: PokemonGameIndiceModel) => {
      this.game_indices.push(
        new PokemonGameIndiceModel().deserialize(game_indice)
      );
    });
    this.held_items = [];
    input['held_items'].forEach((held_item: PokemonHeldItemModel) => {
      this.held_items.push(new PokemonHeldItemModel().deserialize(held_item));
    });
    this.moves = [];
    input['moves'].forEach((move: PokemonMoveModel) => {
      this.moves.push(new PokemonMoveModel().deserialize(move));
    });
    this.species = new ReferenceModel().deserialize(input['species']);
    this.sprites = new PokemonSpritesModel().deserialize(input['sprites']);
    return this;
  }
}
