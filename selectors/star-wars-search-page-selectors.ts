export class StarWarsSearchPageSelectors {
    public readonly peopleRadioSelector = "//*[@id='people']";
    public readonly planetsRadioSelector = "//*[@id='planets']";
    public readonly searchInputSelector = "//*[@id='query']";
    public readonly searchButtonSelector = "//*[@type='submit']";
    public readonly notFoundMessageSelector = "//*[text()=' Not found. ']";
    public readonly genderTextSelector = "//*[text()='Gender:']";
    public readonly birthYearTextSelector = "//*[text()='Birth year:']";
    public readonly eyeColorTextSelector = "//*[text()='Eye color:']";
    public readonly skinColorTextSelector = "//*[text()='Skin color:']";
    public readonly populationTextSelector = "//*[text()='Population:']";
    public readonly climateTextSelector = "//*[text()='Climate:']";
    public readonly gravityTextSelector = "//*[text()='Gravity:']";
    public readonly resultCardSelector = "//*[@class='card-subtitle mb-2 text-muted']";

    public getGenderValueSelector(value: string): string {
        return `//*[contains(text(), '${value}')]`;
    }

    public getBirthYearValueSelector(value: string): string {
        return `//*[contains(text(), '${value}')]`;
    }

    public getEyeColorValueSelector(value: string): string {
        return `//*[contains(text(), '${value}')]`;
    }

    public getSkinColorValueSelector(value: string): string {
        return `//*[contains(text(), '${value}')]`;
    }

    public getPopulationValueSelector(value: string): string {
        return `//*[contains(text(), '${value}')]`;
    }

    public getClimateValueSelector(value: string): string {
        return `//*[contains(text(), '${value}')]`;
    }

    public getGravityValueSelector(value: string): string {
        return `//*[contains(text(), '${value}')]`;
    }
}
