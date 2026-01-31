import { Page } from '@playwright/test';
import { SwapiUnavailableException } from '../exceptions/swapi-unavailable-exception';
import { EnvironmentConfig } from '../config/environment-config';

export class BaseTests {
    private readonly page: Page;
    private readonly config: EnvironmentConfig;

    public constructor(page: Page) {
        this.page = page;
        this.config = EnvironmentConfig.getInstance();
    }

    public async navigateToStarWarsApp(): Promise<void> {
        await this.swapiHealthCheck();
        await this.page.goto(this.config.baseUrl);
        await this.page.waitForLoadState('domcontentloaded');
    }

    private async swapiHealthCheck(): Promise<void> {
        const response = await this.page.request.get(this.config.swapiUrl);
        if (!response.ok()) {
            throw new SwapiUnavailableException(response.status());
        }
    }
}