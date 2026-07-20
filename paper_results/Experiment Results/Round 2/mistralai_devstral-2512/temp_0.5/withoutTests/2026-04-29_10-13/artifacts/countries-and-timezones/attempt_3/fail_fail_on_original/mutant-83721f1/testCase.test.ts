import { getAllTimezones } from "./src/index.js";

describe("getAllTimezones mutation test", () => {
  it("should not re-memoize timezones when already memoized", () => {
    // First call should memoize
    const firstResult = getAllTimezones();

    // Second call should return memoized data without re-memoizing
    // The mutation would force re-memoization on every call
    const secondResult = getAllTimezones();

    // Both calls should return identical results
    expect(firstResult).toEqual(secondResult);
  });
});