import { Page } from '@playwright/test';
import { Interactions } from '../utils/interactions';
import { Assertions } from '../utils/assertions';

export abstract class BasePage {
    protected readonly page: Page;
    protected readonly interactions: Interactions;
    protected readonly assertions: Assertions;

    protected constructor(page: Page) {
        this.page = page;
        this.interactions = new Interactions();
        this.assertions = new Assertions();
    }
}
