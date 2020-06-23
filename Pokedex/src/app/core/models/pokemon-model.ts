export class PokemonModel {
    id: string;
    name: string;
    img: string;
    types: string[];
    height: number;
    weight: number;
    stats: number[];
    abilities: string[];

    constructor(
        id: string, 
        name: string, 
        img: string, 
        types: string[], 
        height: number,
        weight: number,
        stats: number[],
        abilities: string[]
    ) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.types = types;
        this.height = height;
        this.weight = weight;
        this.stats = stats;
        this.abilities = abilities;
    }
}
