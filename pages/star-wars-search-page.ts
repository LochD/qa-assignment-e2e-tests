import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { StarWarsSearchPageSelectors } from '../selectors/star-wars-search-page-selectors';
import { StarWarsSearchPageAssertions } from '../assertions/star-wars-search-page-assertions';

export class StarWarsSearchPage extends BasePage {
    private readonly selectors: StarWarsSearchPageSelectors;
    readonly pageAssertions: StarWarsSearchPageAssertions;

    public constructor(page: Page) {
        super(page);
        this.selectors = new StarWarsSearchPageSelectors();
        this.pageAssertions = new StarWarsSearchPageAssertions(page);
    }

    public async clickPeopleRadioButton(): Promise<void> {
        await this.interactions.click(this.page.locator(this.selectors.peopleRadioSelector));
    }

    public async clickPlanetsRadioButton(): Promise<void> {
        await this.interactions.click(this.page.locator(this.selectors.planetsRadioSelector));
    }

    public async fillSearchInput(text: string): Promise<void> {
        await this.interactions.fillInput(this.page.locator(this.selectors.searchInputSelector), text);
    }

    public async clickSearchButton(): Promise<void> {
        await this.interactions.click(this.page.locator(this.selectors.searchButtonSelector));
    }

    public async pressEnterOnSearchInput(): Promise<void> {
        await this.interactions.pressEnter(this.page.locator(this.selectors.searchInputSelector));
    }

    public async clearSearchInput(): Promise<void> {
        await this.interactions.clearInput(this.page.locator(this.selectors.searchInputSelector));
    }
}
