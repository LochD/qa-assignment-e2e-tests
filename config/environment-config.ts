import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

export class EnvironmentConfig {
    public readonly baseUrl: string;
    public readonly swapiUrl: string;

    private static instance: EnvironmentConfig;

    private constructor() {
        this.loadEnvironment();
        this.baseUrl = process.env.BASE_URL || 'http://localhost:4200';
        this.swapiUrl = process.env.SWAPI_URL || 'https://swapi.dev/';
    }

    public static getInstance(): EnvironmentConfig {
        if (!EnvironmentConfig.instance) {
            EnvironmentConfig.instance = new EnvironmentConfig();
        }
        return EnvironmentConfig.instance;
    }

    private loadEnvironment(): void {
        const rootDir = path.resolve(__dirname, '..');
        const envLocalPath = path.join(rootDir, '.env.local');
        const envPath = path.join(rootDir, '.env');

        // Load .env.local if exists
        if (fs.existsSync(envLocalPath)) {
            dotenv.config({ path: envLocalPath });
        } else {
            // Fallback to .env
            dotenv.config({ path: envPath });
        }
    }
}
