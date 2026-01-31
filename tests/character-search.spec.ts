import { test } from '@playwright/test';
import { BaseTests } from '../base/base-tests';
import { StarWarsSearchPage } from '../pages/star-wars-search-page';
import { LukeSkywalker } from '../test-data/luke-skywalker';

test.describe('Character Search', () => {
    let baseTests: BaseTests;
    let starWarsSearchPage: StarWarsSearchPage;

    test.beforeEach(async ({ page }) => {
        baseTests = new BaseTests(page);
        starWarsSearchPage = new StarWarsSearchPage(page);
        await baseTests.navigateToStarWarsApp();
    });

    test('should display character details for valid search by clicking Search button', async () => {
        //Given
        const lukeSkywalker = new LukeSkywalker();

        //When
        await starWarsSearchPage.clickPeopleRadioButton();
        await starWarsSearchPage.fillSearchInput(lukeSkywalker.name);
        await starWarsSearchPage.clickSearchButton();

        //Then
        await starWarsSearchPage.pageAssertions.assertGenderValueIsVisible(lukeSkywalker.gender);
        await starWarsSearchPage.pageAssertions.assertBirthYearValueIsVisible(lukeSkywalker.birthYear);
        await starWarsSearchPage.pageAssertions.assertEyeColorValueIsVisible(lukeSkywalker.eyeColor);
        await starWarsSearchPage.pageAssertions.assertSkinColorValueIsVisible(lukeSkywalker.skinColor);
    });

    test('should display character details for valid search by pressing Enter key', async () => {
        //Given
        const lukeSkywalker = new LukeSkywalker();

        //When
        await starWarsSearchPage.clickPeopleRadioButton();
        await starWarsSearchPage.fillSearchInput(lukeSkywalker.name);
        await starWarsSearchPage.pressEnterOnSearchInput();

        //Then
        await starWarsSearchPage.pageAssertions.assertGenderValueIsVisible(lukeSkywalker.gender);
        await starWarsSearchPage.pageAssertions.assertBirthYearValueIsVisible(lukeSkywalker.birthYear);
        await starWarsSearchPage.pageAssertions.assertEyeColorValueIsVisible(lukeSkywalker.eyeColor);
        await starWarsSearchPage.pageAssertions.assertSkinColorValueIsVisible(lukeSkywalker.skinColor);
    });

    test('should display "Not found" for invalid search by clicking Search button', async () => {
        //Given
        const invalidCharacterName = "invalidCharacterName";

        //When
        await starWarsSearchPage.clickPeopleRadioButton();
        await starWarsSearchPage.fillSearchInput(invalidCharacterName);
        await starWarsSearchPage.clickSearchButton();

        //Then
        await starWarsSearchPage.pageAssertions.assertGenderTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertBirthYearTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertEyeColorTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertSkinColorTextIsNotVisible();

        //And
        await starWarsSearchPage.pageAssertions.assertNotFoundMessageIsVisible()
    });

    test('should display multiple character results for partial matching search', async () => {
        //Given
        const partialSearchTerm = "lu";
        const expectedResultCount = 2;

        //When
        await starWarsSearchPage.clickPeopleRadioButton();
        await starWarsSearchPage.fillSearchInput(partialSearchTerm);
        await starWarsSearchPage.clickSearchButton();

        //Then
        await starWarsSearchPage.pageAssertions.assertResultCardsCount(expectedResultCount);
    });

    // BUG-001: Skipped due to application not clearing results when searching with empty input (check Bugs.md for details)
    test.skip('should clear character results when searching with empty input', async () => {
        //Given
        const lukeSkywalker = new LukeSkywalker();
        await starWarsSearchPage.clickPeopleRadioButton();
        await starWarsSearchPage.fillSearchInput(lukeSkywalker.name);
        await starWarsSearchPage.clickSearchButton();
        await starWarsSearchPage.pageAssertions.assertGenderValueIsVisible(lukeSkywalker.gender);

        //When
        await starWarsSearchPage.clearSearchInput();
        await starWarsSearchPage.clickSearchButton();

        //Then
        await starWarsSearchPage.pageAssertions.assertGenderTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertBirthYearTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertEyeColorTextIsNotVisible();
        await starWarsSearchPage.pageAssertions.assertSkinColorTextIsNotVisible();
    });
});
