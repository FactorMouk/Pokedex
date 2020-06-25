import { DeserializableModel } from '../../deserializable.model';
import { ReferenceModel } from '../../reference.model';

// Modelo de objeto VersionGroup de Move retornado em objeto Pokémon pela API
export class MoveVersionGroupDetailModel implements DeserializableModel {
  level_learned_at: number;
  move_learn_method: ReferenceModel;
  version_group: ReferenceModel;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.move_learn_method = new ReferenceModel().deserialize(
      input['move_learn_method']
    );
    this.version_group = new ReferenceModel().deserialize(
      input['version_group']
    );
    return this;
  }
}
