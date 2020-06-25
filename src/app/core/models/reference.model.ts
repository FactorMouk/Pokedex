import { DeserializableModel } from './deserializable.model';

//Objeto Referência
export class ReferenceModel implements DeserializableModel {
  name: string;
  url: string;
  deserialize(input: unknown): this {
    Object.assign(this, input);
    return this;
  }
}
