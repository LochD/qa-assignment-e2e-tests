export class ElementVisibilityException extends Error {
    public constructor(selector: string, expectedState: 'visible' | 'not visible', actualState: string) {
        const message = `
================================================================================
ASSERTION FAILED: Element visibility mismatch
================================================================================
Selector: ${selector}
Expected: Element should be ${expectedState}
Actual:   Element is ${actualState}
--------------------------------------------------------------------------------
Possible causes:
- Element has not loaded yet (timing issue)
- Element is hidden by CSS (display: none, visibility: hidden)
- Element does not exist in the DOM
- Selector is incorrect or has changed
================================================================================`;
        super(message);
        this.name = 'ElementVisibilityException';
    }
}
