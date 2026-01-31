import { Locator } from '@playwright/test';

export class Interactions {

    public async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    public async fillInput(locator: Locator, keysToSend: string): Promise<void> {
        await locator.fill(keysToSend);
    }

    public async pressEnter(locator: Locator): Promise<void> {
        await locator.press('Enter');
    }

    public async clearInput(locator: Locator): Promise<void> {
        await locator.clear();
    }
}
