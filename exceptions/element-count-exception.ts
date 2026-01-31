export class ElementCountException extends Error {
    public constructor(selector: string, expectedCount: number, actualCount: number) {
        const message = `
================================================================================
ASSERTION FAILED: Element count mismatch
================================================================================
Selector: ${selector}
Expected count: ${expectedCount}
Actual count:   ${actualCount}
--------------------------------------------------------------------------------
Possible causes:
- Search returned different number of results than expected
- Elements have not fully loaded yet (timing issue)
- Selector is incorrect or has changed
- API response differs from expected test data
================================================================================`;
        super(message);
        this.name = 'ElementCountException';
    }
}
