import { DeserializableModel } from './../deserializable.model';
import { ReferenceModel } from './../reference.model';

export class PokemonTypeModel implements DeserializableModel {
  slot: number;
  type: ReferenceModel;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.type = new ReferenceModel().deserialize(input['type']);
    return this;
  }
}
