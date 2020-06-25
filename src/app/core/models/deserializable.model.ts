export interface DeserializableModel {
  deserialize(input: unknown): this;
}
