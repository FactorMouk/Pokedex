import { DeserializableModel } from '../../deserializable.model';
import { ReferenceModel } from '../../reference.model';
import { MoveVersionGroupDetailModel } from './move-version-group-detail.model';

// Modelo de objeto Move retornado em objeto Pokémon pela API
export class PokemonMoveModel implements DeserializableModel {
  move: ReferenceModel;
  version_group_details: MoveVersionGroupDetailModel[];
  deserialize(input: unknown): this {
    Object.assign(this, input);
    input['version_group_details'].forEach(
      (reference: MoveVersionGroupDetailModel) => {
        this.version_group_details.push(
          new MoveVersionGroupDetailModel().deserialize(reference)
        );
      }
    );
    return this;
  }
}
