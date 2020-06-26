import { ReferenceModel } from '../reference.model';

// Modelo de objeto GameIndice de Type retornado pela API
export class TypeGameIndiceModel {
  game_index: number;
  generation: ReferenceModel;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.generation = new ReferenceModel().deserialize(input['generation']);
    return this;
  }
}
