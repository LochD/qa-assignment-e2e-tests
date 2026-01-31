import { expect, Locator } from '@playwright/test';
import { ElementVisibilityException } from '../exceptions/element-visibility-exception';
import { ElementCountException } from '../exceptions/element-count-exception';

export class Assertions {

    public async assertElementIsVisible(locator: Locator): Promise<void> {
        try {
            await expect(locator).toBeVisible();
        } catch (error) {
            const selector = locator.toString();
            throw new ElementVisibilityException(selector, 'visible', 'not visible or not found');
        }
    }

    public async assertElementIsNotVisible(locator: Locator): Promise<void> {
        try {
            await expect(locator).not.toBeVisible();
        } catch (error) {
            const selector = locator.toString();
            throw new ElementVisibilityException(selector, 'not visible', 'visible');
        }
    }

    public async assertElementCount(locator: Locator, expectedCount: number): Promise<void> {
        try {
            await expect(locator).toHaveCount(expectedCount);
        } catch (error) {
            const selector = locator.toString();
            const actualCount = await locator.count();
            throw new ElementCountException(selector, expectedCount, actualCount);
        }
    }
}
