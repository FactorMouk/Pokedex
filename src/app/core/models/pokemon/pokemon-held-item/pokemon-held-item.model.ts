import { DeserializableModel } from './../../deserializable.model';
import { HeldItemVersionDetailModel } from './held-item-version-detail.model';
import { ReferenceModel } from '../../reference.model';

// Modelo de objeto HeldItem retornado em objeto Pokémon pela API
export class PokemonHeldItemModel implements DeserializableModel {
  item: ReferenceModel;
  version_details: HeldItemVersionDetailModel[];
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.version_details = [];
    input['version_details'].forEach(
      (reference: HeldItemVersionDetailModel) => {
        this.version_details.push(
          new HeldItemVersionDetailModel().deserialize(reference)
        );
      }
    );
    return this;
  }
}
