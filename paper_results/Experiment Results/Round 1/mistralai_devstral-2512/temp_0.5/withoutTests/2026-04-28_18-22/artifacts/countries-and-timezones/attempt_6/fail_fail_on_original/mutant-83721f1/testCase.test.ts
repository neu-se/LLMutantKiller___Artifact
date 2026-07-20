import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization condition", () => {
  it("should only memoize timezones when memoizedTimezones differs from totalTimezones", () => {
    // First call to memoize all timezones
    const firstResult = getAllTimezones();

    // Track the number of timezones returned
    const firstCount = Object.keys(firstResult).length;

    // Call getAllTimezones again - in original code this won't re-memoize
    // because memoizedTimezones == totalTimezones after first call
    const secondResult = getAllTimezones();
    const secondCount = Object.keys(secondResult).length;

    // Results should be identical
    expect(secondResult).toEqual(firstResult);
    expect(secondCount).toBe(firstCount);

    // The key difference is in the mutation condition:
    // Original: if (totalTimezones !== memoizedTimezones)
    // Mutated: if (true)
    // This causes the mutated version to always attempt memoization
    // even when all timezones are already memoized

    // We can detect this by checking if the function behavior changes
    // when called multiple times in quick succession
    const thirdResult = getAllTimezones();
    expect(thirdResult).toEqual(secondResult);

    // In the mutated version, this might cause:
    // 1. Performance degradation (though we can't test that directly)
    // 2. Potential race conditions in the memoization
    // 3. Different object references being returned

    // Test object reference stability
    expect(secondResult).toBe(firstResult);
    expect(thirdResult).toBe(secondResult);
  });
});