# Star Wars Search - E2E Tests

End-to-end test automation suite for the Star Wars Search web application using Playwright and TypeScript.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Environment Configuration](#environment-configuration)
- [Testing Strategy](#testing-strategy)
- [External API Dependency Strategy](#external-api-dependency-strategy)
- [Key Decisions and Trade-offs](#key-decisions-and-trade-offs)
- [CI/CD](#cicd)
- [Known Issues](#known-issues)

## Project Overview

This project contains automated E2E tests for the Star Wars Search application, which allows users to search for Star Wars characters and planets using the SWAPI (Star Wars API).

### Application Features Tested

- Search for characters (People)
- Search for planets
- Partial matching search (multiple results)
- Search via button click and Enter key

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Playwright | E2E testing framework |
| TypeScript | Programming language |
| Node.js | Runtime environment |
| GitHub Actions | CI/CD pipeline |

## Project Structure

```
fedex-qa-assignment-e2e-tests/
├── assertions/                    # Page-specific assertions
│   └── star-wars-search-page-assertions.ts
├── base/                          # Base test configuration
│   └── base-tests.ts
├── config/                        # Environment configuration
│   └── environment-config.ts
├── exceptions/                    # Custom exceptions
│   ├── element-count-exception.ts
│   ├── element-visibility-exception.ts
│   └── swapi-unavailable-exception.ts
├── pages/                         # Page Object Model
│   ├── base-page.ts
│   └── star-wars-search-page.ts
├── selectors/                     # Element selectors
│   └── star-wars-search-page-selectors.ts
├── test-data/                     # Test data classes
│   ├── character-data.ts
│   ├── luke-skywalker.ts
│   ├── planet-data.ts
│   └── tatooine.ts
├── tests/                         # Test specifications
│   ├── character-search.spec.ts
│   └── planet-search.spec.ts
├── utils/                         # Utility classes
│   ├── assertions.ts
│   └── interactions.ts
├── .env                           # Environment variables (default)
├── .env.local.example             # Environment variables template
├── Bugs.md                        # Bug reports
├── playwright.config.ts           # Playwright configuration
└── package.json
```

### Design Patterns Used

| Pattern | Description |
|---------|-------------|
| Page Object Model (POM) | Encapsulates page interactions and selectors |
| Singleton | Environment configuration |
| Abstract Classes | Base classes for pages and test data |
| Inheritance | Page classes extend BasePage, test data extends base data classes |

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd fedex-qa-assignment-e2e-tests

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/character-search.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests with UI mode
npx playwright test --ui

# View HTML report
npx playwright show-report
```

## Test Coverage

### Character Search Tests

| Test Case | Description |
|-----------|-------------|
| Valid search (button) | Search for valid character using Search button |
| Valid search (Enter) | Search for valid character using Enter key |
| Invalid search | Search for non-existent character shows "Not found" |
| Partial matching | Partial search term returns multiple results |
| Clear results | Empty search clears previous results (BUG-001) |

### Planet Search Tests

| Test Case | Description |
|-----------|-------------|
| Valid search (button) | Search for valid planet using Search button |
| Valid search (Enter) | Search for valid planet using Enter key |
| Invalid search | Search for non-existent planet shows "Not found" |
| Partial matching | Partial search term returns multiple results |
| Clear results | Empty search clears previous results (BUG-001) |

## Environment Configuration

The project uses environment variables for configuration:

### Default Configuration (.env)

```env
BASE_URL=http://localhost:4200
SWAPI_URL=https://swapi.dev/
```

### Local Override

1. Copy `.env.local.example` to `.env.local`
2. Modify values as needed
3. `.env.local` takes priority over `.env`

## Testing Strategy

### Approach

This project follows a **behavior-driven** approach where tests are written to be readable and focused on user actions:

```typescript
test('should display character details for valid search', async () => {
    //Given
    const lukeSkywalker = new LukeSkywalker();

    //When
    await starWarsSearchPage.clickPeopleRadioButton();
    await starWarsSearchPage.fillSearchInput(lukeSkywalker.name);
    await starWarsSearchPage.clickSearchButton();

    //Then
    await starWarsSearchPage.pageAssertions.assertGenderValueIsVisible(lukeSkywalker.gender);
});
```

## External API Dependency Strategy

The application relies on SWAPI (Star Wars API), which is an external service with no availability guarantee.

### Implemented Strategy

1. **Health Check**: Before each test navigation, a health check is performed against SWAPI
2. **Custom Exception**: If SWAPI is unavailable, a descriptive `SwapiUnavailableException` is thrown
3. **Fail Fast**: Tests fail immediately with clear error message rather than timing out

```typescript
private async swapiHealthCheck(): Promise<void> {
    const response = await this.page.request.get(this.config.swapiUrl);
    if (!response.ok()) {
        throw new SwapiUnavailableException(response.status());
    }
}
```

### Alternative Strategies (Not Implemented)

| Strategy | Pros | Cons |
|----------|------|------|
| API Mocking | Tests run independently, fast, reliable | May miss real integration issues |
| Retry Logic | Handles temporary outages | Still dependent on external API |
| Contract Testing | Validates API contract | Requires additional setup |

### Recommendation

For production use, consider implementing **API mocking** using Playwright's route interception to ensure tests can run independently of external services.

## Key Decisions and Trade-offs

### 1. Page Object Model

**Decision**: Implement POM with separate selectors, assertions, and page classes.

**Trade-off**: More files and initial setup time, but better maintainability and reusability.

### 2. Abstract Base Classes

**Decision**: Use abstract classes for BasePage and test data.

**Trade-off**: Enforces consistent structure but adds complexity for simple cases.

### 3. Health Check vs API Mocking

**Decision**: Implemented health check instead of full API mocking.

**Trade-off**: Simpler implementation but tests still depend on external API availability.

### 4. Custom Exceptions

**Decision**: Created custom exceptions for better error messages.

**Trade-off**: Additional code but significantly improved debugging experience.

### 5. Environment Configuration

**Decision**: Use dotenv with `.env` and `.env.local` pattern.

**Trade-off**: Requires additional setup but provides flexibility for different environments.

## CI/CD

GitHub Actions workflow is configured in `.github/workflows/e2e-tests.yml`.

### Pipeline Features

- Runs on push/PR to main/master branches
- Installs dependencies and Playwright browsers
- Executes all tests
- Uploads HTML report as artifact (30 days retention)

### Configuration

Set the following repository variables in GitHub:
- `BASE_URL`: Application URL
- `SWAPI_URL`: SWAPI API URL

## Known Issues

See [Bugs.md](Bugs.md) for detailed bug reports.

### BUG-001: Search results not cleared with empty input

**Status**: Open (tests skipped)

**Description**: When results are displayed and user searches with empty input, previous results remain visible instead of being cleared.

## Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Reports include:
- Test results (pass/fail)
- Screenshots on failure
- Trace viewer for debugging
- Timeline of test execution
