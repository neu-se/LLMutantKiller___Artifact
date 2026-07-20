import { getAllTimezones } from "./src/index.js";

describe("getAllTimezones memoization behavior", () => {
  it("should not re-memoize timezones when already memoized", () => {
    // First call should memoize timezones
    const firstResult = getAllTimezones();

    // Second call should return memoized data without re-memoizing
    const secondResult = getAllTimezones();

    // Both results should be identical
    expect(firstResult).toEqual(secondResult);
  });
});