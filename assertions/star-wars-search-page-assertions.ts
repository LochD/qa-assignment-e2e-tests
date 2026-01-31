import { Page } from '@playwright/test';
import { Assertions } from '../utils/assertions';
import { StarWarsSearchPageSelectors } from '../selectors/star-wars-search-page-selectors';

export class StarWarsSearchPageAssertions {
    private readonly page: Page;
    private readonly assertions: Assertions;
    private readonly selectors: StarWarsSearchPageSelectors;

    constructor(page: Page) {
        this.page = page;
        this.assertions = new Assertions();
        this.selectors = new StarWarsSearchPageSelectors();
    }

    public async assertGenderValueIsVisible(value: string): Promise<void> {
        await this.assertions.assertElementIsVisible(this.page.locator(this.selectors.getGenderValueSelector(value)));
    }

    public async assertBirthYearValueIsVisible(value: string): Promise<void> {
        await this.assertions.assertElementIsVisible(this.page.locator(this.selectors.getBirthYearValueSelector(value)));
    }

    public async assertEyeColorValueIsVisible(value: string): Promise<void> {
        await this.assertions.assertElementIsVisible(this.page.locator(this.selectors.getEyeColorValueSelector(value)));
    }

    public async assertSkinColorValueIsVisible(value: string): Promise<void> {
        await this.assertions.assertElementIsVisible(this.page.locator(this.selectors.getSkinColorValueSelector(value)));
    }

    public async assertNotFoundMessageIsVisible(): Promise<void> {
        await this.assertions.assertElementIsVisible(this.page.locator(this.selectors.notFoundMessageSelector));
    }

    public async assertGenderTextIsNotVisible(): Promise<void> {
        await this.assertions.assertElementIsNotVisible(this.page.locator(this.selectors.genderTextSelector));
    }

    public async assertBirthYearTextIsNotVisible(): Promise<void> {
        await this.assertions.assertElementIsNotVisible(this.page.locator(this.selectors.birthYearTextSelector));
    }

    public async assertEyeColorTextIsNotVisible(): Promise<void> {
        await this.assertions.assertElementIsNotVisible(this.page.locator(this.selectors.eyeColorTextSelector));
    }

    public async assertSkinColorTextIsNotVisible(): Promise<void> {
        await this.assertions.assertElementIsNotVisible(this.page.locator(this.selectors.skinColorTextSelector));
    }

    public async assertPopulationValueIsVisible(value: string): Promise<void> {
        await this.assertions.assertElementIsVisible(this.page.locator(this.selectors.getPopulationValueSelector(value)));
    }

    public async assertClimateValueIsVisible(value: string): Promise<void> {
        await this.assertions.assertElementIsVisible(this.page.locator(this.selectors.getClimateValueSelector(value)));
    }

    public async assertGravityValueIsVisible(value: string): Promise<void> {
        await this.assertions.assertElementIsVisible(this.page.locator(this.selectors.getGravityValueSelector(value)));
    }

    public async assertPopulationTextIsNotVisible(): Promise<void> {
        await this.assertions.assertElementIsNotVisible(this.page.locator(this.selectors.populationTextSelector));
    }

    public async assertClimateTextIsNotVisible(): Promise<void> {
        await this.assertions.assertElementIsNotVisible(this.page.locator(this.selectors.climateTextSelector));
    }

    public async assertGravityTextIsNotVisible(): Promise<void> {
        await this.assertions.assertElementIsNotVisible(this.page.locator(this.selectors.gravityTextSelector));
    }

    public async assertResultCardsCount(expectedCount: number): Promise<void> {
        await this.assertions.assertElementCount(this.page.locator(this.selectors.resultCardSelector), expectedCount);
    }
}
