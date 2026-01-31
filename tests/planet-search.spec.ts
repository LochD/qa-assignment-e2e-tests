import { test } from '@playwright/test';
import { BaseTests } from '../base/base-tests';
import { StarWarsSearchPage } from '../pages/star-wars-search-page';
import { Tatooine } from '../test-data/tatooine';

test.describe('Planet Search', () => {
    let baseTests: BaseTests;
    let starWarsSearchPage: StarWarsSearchPage;

    test.beforeEach(async ({ page }) => {
        baseTests = new BaseTests(page);
        starWarsSearchPage = new StarWarsSearchPage(page);
        await baseTests.navigateToStarWarsApp();
    });

    test('should display planet details for valid search by clicking Search button', async () => {
        //Given
        const tatooine = new Tatooine();

        //When
        await starWarsSearchPage.clickPlanetsRadioButton();
        await starWarsSearchPage.fillSearchInput(tatooine.name);
        await starWarsSearchPage.clickSearchButton();

        //Then
        await starWarsSearchPage.pageAssertions.assertPopulationValueIsVisible(tatooine.population);
        await starWarsSearchPage.pageAssertions.assertClimateValueIsVisible(tatooine.climate);
        await starWarsSearchPage.pageAssertions.assertGravityValueIsVisible(tatooine.gravity);
    });

    test('should display planet details for valid search by pressing Enter key', async () => {
        //Given
        const tatooine = new Tatooine();

        //When
        await starWarsSearchPage.clickPlanetsRadioButton();
        await starWarsSearchPage.fillSearchInput(tatooine.name);
        await starWarsSearchPage.pressEnterOnSearchInput();

        //Then
        await starWarsSearchPage.pageAssertions.assertPopulationValueIsVisible(tatooine.population);
        await starWarsSearchPage.pageAssertions.assertClimateValueIsVisible(tatooine.climate);
        await starWarsSearchPage.pageAssertions.assertGravityValueIsVisible(tatooine.gravity);
    });

    test('should display "Not found" for invalid search by clicking Search button', async () => {
        //Given
        const invalidPlanetName = "invalidPlanetName";

        //When
        await starWarsSearchPage.clickPlanetsRadioButton();
        await starWarsSearchPage.fillSearchInput(invalidPlanetName);
        await starWarsSearchPage.clickSearchButton();

        //Then
        await starWarsSearchPage.pageAssertions.assertPopulationTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertClimateTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertGravityTextIsNotVisible();

        //And
        await starWarsSearchPage.pageAssertions.assertNotFoundMessageIsVisible();
    });

    test('should display multiple planet results for partial matching search', async () => {
        //Given
        const partialSearchTerm = "tho";
        const expectedResultCount = 2;

        //When
        await starWarsSearchPage.clickPlanetsRadioButton();
        await starWarsSearchPage.fillSearchInput(partialSearchTerm);
        await starWarsSearchPage.clickSearchButton();

        //Then
        await starWarsSearchPage.pageAssertions.assertResultCardsCount(expectedResultCount);
    });

    // BUG-001: Skipped due to application not clearing results when searching with empty input (check Bugs.md for details)
    test.skip('should clear planet results when searching with empty input', async () => {
        //Given
        const tatooine = new Tatooine();
        await starWarsSearchPage.clickPlanetsRadioButton();
        await starWarsSearchPage.fillSearchInput(tatooine.name);
        await starWarsSearchPage.clickSearchButton();
        await starWarsSearchPage.pageAssertions.assertPopulationValueIsVisible(tatooine.population);

        //When
        await starWarsSearchPage.clearSearchInput();
        await starWarsSearchPage.clickSearchButton();

        //Then
        await starWarsSearchPage.pageAssertions.assertPopulationTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertClimateTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertGravityTextIsNotVisible();
    });
});
