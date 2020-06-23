export class TypeModel {
    damage_relations: {};
    game_indices: [];
    generation: {};
    id: number;
    move_damage_class: {};
    moves: [];
    name: string;
    names: [];
    pokemon: [];
    constructor(
        damage_relations: {} = null,
        game_indices: [] = null,
        generation: {} = null,
        id: number = null,
        move_damage_class: {} = null,
        moves: [] = null,
        name: string = null,
        names: [] = null,
        pokemon: [] = null
    ) {
        this.game_indices = game_indices;
        this.generation = generation;
        this.id = id;
        this.move_damage_class = move_damage_class;
        this.moves = moves;
        this.name = name;
        this.names = names;
        this.pokemon = pokemon;
    }
}