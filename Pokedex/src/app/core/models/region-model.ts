// Modelo de objeto Região retornado pela API
export class RegionModel {
  id: number;
  locations: [];
  main_generation: {};
  name: string;
  names: [];
  pokedexes: [];
  version_groups: [];
  constructor(
    id: number = null,
    locations: [] = null,
    main_generation: {} = null,
    name: string = null,
    names: [] = null,
    pokedexes: [] = null,
    version_groups: [] = null
  ) {
    this.id = id;
    this.locations = locations;
    this.main_generation = main_generation;
    this.name = name;
    this.names = names;
    this.pokedexes = pokedexes;
    this.version_groups = version_groups;
  }
}
