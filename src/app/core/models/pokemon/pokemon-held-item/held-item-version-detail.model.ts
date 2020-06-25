import { DeserializableModel } from './../../deserializable.model';
import { ReferenceModel } from '../../reference.model';

// Modelo de objeto VersionDetail de HeldItem retornado em objeto Pokémon pela API
export class HeldItemVersionDetailModel implements DeserializableModel {
  rarity: number;
  version: ReferenceModel;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.version = new ReferenceModel().deserialize(input['version']);
    return this;
  }
}
