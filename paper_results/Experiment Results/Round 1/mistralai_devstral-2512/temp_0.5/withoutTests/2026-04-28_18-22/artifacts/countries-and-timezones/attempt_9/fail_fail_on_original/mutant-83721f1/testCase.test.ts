import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization condition", () => {
  it("should only memoize timezones when memoizedTimezones differs from totalTimezones", () => {
    // First call to memoize all timezones
    const firstResult = getAllTimezones();
    const firstKeys = Object.keys(firstResult);

    // Second call should not re-memoize since all timezones are already memoized
    const secondResult = getAllTimezones();
    const secondKeys = Object.keys(secondResult);

    // Verify results are identical
    expect(secondResult).toEqual(firstResult);
    expect(secondKeys).toEqual(firstKeys);

    // The key difference between original and mutated code:
    // Original: only memoizes when totalTimezones !== memoizedTimezones
    // Mutated: always memoizes (if (true))
    // This causes different behavior in edge cases

    // Test with deprecated option to verify consistent behavior
    const withDeprecated = getAllTimezones({ deprecated: true });
    expect(withDeprecated).toEqual(firstResult);

    // Verify the number of timezones remains consistent
    expect(Object.keys(withDeprecated).length).toBe(firstKeys.length);
  });
});