export class SwapiUnavailableException extends Error {
    public constructor(statusCode?: number) {
        const message = statusCode
            ? `SWAPI third party API is unavailable. Status code: ${statusCode}. Please check https://swapi.dev/ service status.`
            : `SWAPI third party API is unavailable. Please check https://swapi.dev/ service status.`;
        super(message);
        this.name = 'SwapiUnavailableException';
    }
}
