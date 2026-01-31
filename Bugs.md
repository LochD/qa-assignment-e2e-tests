# Bug Report

## BUG-001: Search results not cleared when searching with empty input

### Summary
When search results are displayed and the user clears the search input field and performs a search, the previous results remain visible instead of being cleared.

### Environment
- Application: Star Wars Search
- URL: http://localhost:4200
- Browser: All browsers (Chromium, Firefox, WebKit)

### Requirement Reference
> "When results are shown for a search action, searching with an empty search input field will clear the search results (previous results are removed)."

### Expected Behavior
1. User searches for a valid character/planet
2. Results are displayed (e.g., Gender, Birth year, Eye color, Skin color for characters)
3. User clears the search input field (leaves it empty)
4. User clicks "Search" button or presses Enter
5. **Expected:** Previous search results should be removed/cleared from the screen

### Actual Behavior
Previous search results remain visible on the screen after searching with an empty input field.

### Steps to Reproduce

#### For Character Search:
1. Navigate to http://localhost:4200
2. Select "People" radio button
3. Enter "Luke Skywalker" in the search input field
4. Click "Search" button
5. Verify that character details are displayed (Gender, Birth year, Eye color, Skin color)
6. Clear the search input field (make it empty)
7. Click "Search" button
8. **Observe:** Previous character results are still visible

#### For Planet Search:
1. Navigate to http://localhost:4200
2. Select "Planets" radio button
3. Enter "Tatooine" in the search input field
4. Click "Search" button
5. Verify that planet details are displayed (Population, Climate, Gravity)
6. Clear the search input field (make it empty)
7. Click "Search" button
8. **Observe:** Previous planet results are still visible

### Affected Test Cases
- `character-search.spec.ts`: "should clear character results when searching with empty input" (SKIPPED)
- `planet-search.spec.ts`: "should clear planet results when searching with empty input" (SKIPPED)

### Suggested Fix
The application should handle empty search input by clearing the current results display area. This could be implemented by:
1. Checking if the search query is empty before making an API call
2. If empty, clear the results state/array
3. Update the UI to reflect the empty results

### Additional Notes
This behavior affects both Character and Planet search functionality. The tests have been marked as skipped until this bug is resolved.
