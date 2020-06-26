import { ReferenceModel } from './reference.model';

// Modelo de objeto Names retornado pela API
export class NamesModel {
  language: ReferenceModel;
  name: string;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.language = new ReferenceModel().deserialize(input['language']);
    return this;
  }
}
