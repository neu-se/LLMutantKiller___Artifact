import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization", () => {
  it("should not memoize timezones when already memoized", () => {
    // First call should memoize
    const firstResult = getAllTimezones();

    // Second call should not trigger memoization again
    const secondResult = getAllTimezones();

    // Results should be identical
    expect(firstResult).toEqual(secondResult);
  });
});