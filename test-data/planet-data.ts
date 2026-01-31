export abstract class PlanetData {
    public readonly name: string;
    public readonly population: string;
    public readonly climate: string;
    public readonly gravity: string;

    protected constructor(name: string, population: string, climate: string, gravity: string) {
        this.name = name;
        this.population = population;
        this.climate = climate;
        this.gravity = gravity;
    }
}