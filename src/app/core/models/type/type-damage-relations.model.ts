import { ReferenceModel } from '../reference.model';

// Modelo de objeto DamageRelations de Type retornado pela API
export class TypeDamageRelationsModel {
  double_damage_from: ReferenceModel[];
  double_damage_to: ReferenceModel[];
  half_damage_from: ReferenceModel[];
  half_damage_to: ReferenceModel[];
  no_damage_from: ReferenceModel[];
  no_damage_to: ReferenceModel[];
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.double_damage_from = [];
    input['double_damage_from'].forEach((type: ReferenceModel) => {
      this.double_damage_from.push(new ReferenceModel().deserialize(type));
    });
    this.double_damage_to = [];
    input['double_damage_to'].forEach((type: ReferenceModel) => {
      this.double_damage_to.push(new ReferenceModel().deserialize(type));
    });
    this.half_damage_from = [];
    input['half_damage_from'].forEach((type: ReferenceModel) => {
      this.half_damage_from.push(new ReferenceModel().deserialize(type));
    });
    this.half_damage_to = [];
    input['half_damage_to'].forEach((type: ReferenceModel) => {
      this.half_damage_to.push(new ReferenceModel().deserialize(type));
    });
    this.no_damage_from = [];
    input['no_damage_from'].forEach((type: ReferenceModel) => {
      this.no_damage_from.push(new ReferenceModel().deserialize(type));
    });
    this.no_damage_to = [];
    input['no_damage_to'].forEach((type: ReferenceModel) => {
      this.no_damage_to.push(new ReferenceModel().deserialize(type));
    });
    return this;
  }
}
