import { ReferenceModel } from './reference.model';
import { NamesModel } from './names.model';

// Modelo de objeto Region retornado pela API
export class RegionModel {
  id: number;
  locations: ReferenceModel[];
  main_generation: ReferenceModel;
  name: string;
  names: NamesModel[];
  pokedexes: ReferenceModel[];
  version_groups: ReferenceModel[];
  deserialize(input: unknown): this {
    Object.assign(this, input);
    this.locations = [];
    input['locations'].forEach((location: ReferenceModel) => {
      this.locations.push(new ReferenceModel().deserialize(location));
    });
    this.main_generation = new ReferenceModel().deserialize(
      input['main_generation']
    );
    this.names = [];
    input['names'].forEach((name: NamesModel) => {
      this.names.push(new NamesModel().deserialize(name));
    });
    this.pokedexes = [];
    input['pokedexes'].forEach((pokedex: ReferenceModel) => {
      this.pokedexes.push(new ReferenceModel().deserialize(pokedex));
    });
    this.version_groups = [];
    input['version_groups'].forEach((version_group: ReferenceModel) => {
      this.version_groups.push(new ReferenceModel().deserialize(version_group));
    });
    return this;
  }
}
