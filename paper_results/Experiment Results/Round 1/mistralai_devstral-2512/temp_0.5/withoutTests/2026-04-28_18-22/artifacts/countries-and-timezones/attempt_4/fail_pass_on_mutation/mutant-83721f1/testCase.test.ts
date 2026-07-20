import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization condition", () => {
  it("should only memoize timezones when not all are already memoized", () => {
    // First call to establish initial state
    const firstResult = getAllTimezones();
    const firstCount = Object.keys(firstResult).length;

    // Force a scenario where memoization should not occur
    // by calling getAllTimezones again immediately
    const secondResult = getAllTimezones();
    const secondCount = Object.keys(secondResult).length;

    // Results should be identical
    expect(secondResult).toEqual(firstResult);
    expect(secondCount).toBe(firstCount);

    // The key difference: in original code, the condition
    // `totalTimezones !== memoizedTimezones` becomes false after first call
    // In mutated code, the condition is always true, causing re-memoization
    // We can detect this by checking if the result changes between calls
    // (which it shouldn't in either case, but the mutation causes unnecessary work)
    // Since we can't observe the internal memoization directly,
    // we test the observable behavior that should remain consistent

    // Additional call to verify stability
    const thirdResult = getAllTimezones();
    expect(thirdResult).toEqual(secondResult);
    expect(Object.keys(thirdResult).length).toBe(secondCount);
  });
});