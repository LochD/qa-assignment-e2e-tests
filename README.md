# Star Wars Search - E2E Tests

Playwright + TypeScript E2E test suite for the Star Wars Search application.

## Quick Start

```bash
npm install
npx playwright install
npx playwright test
```

## Project Structure

```
├── assertions/          # Page-specific assertions
├── base/                # Base test configuration
├── config/              # Environment configuration
├── exceptions/          # Custom exceptions
├── pages/               # Page Object Model
├── selectors/           # Element selectors
├── test-data/           # Test data classes
├── tests/               # Test specifications
└── utils/               # Utility classes (Interactions, Assertions)
```

## Running Tests

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests |
| `npx playwright test --headed` | Run with browser visible |
| `npx playwright test --ui` | Run with UI mode |
| `npx playwright show-report` | View HTML report |

## Environment Configuration

Default values in `.env`. Create `.env.local` to override:

| Variable | Default |
|----------|---------|
| BASE_URL | http://localhost:4200 |
| SWAPI_URL | https://swapi.dev/ |

## External API Strategy

SWAPI is an external service with no availability guarantee. Implemented approach:
- **Health Check** before each test - fails fast with descriptive error if API unavailable
- **Custom Exceptions** for clear error messages

## CI/CD

GitHub Actions workflow: `.github/workflows/e2e-tests.yml`
- Runs on push/PR to main/master
- Uploads HTML report as artifact

Configure repository variables: `BASE_URL`, `SWAPI_URL`

## Known Issues

See [Bugs.md](Bugs.md) for details.

**BUG-001**: Empty search does not clear previous results (tests skipped)
