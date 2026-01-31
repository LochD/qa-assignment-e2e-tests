export abstract class CharacterData {
    public readonly name: string;
    public readonly gender: string;
    public readonly birthYear: string;
    public readonly eyeColor: string;
    public readonly skinColor: string;

    protected constructor(name: string, gender: string, birthYear: string, eyeColor: string, skinColor: string) {
        this.name = name;
        this.gender = gender;
        this.birthYear = birthYear;
        this.eyeColor = eyeColor;
        this.skinColor = skinColor;
    }
}