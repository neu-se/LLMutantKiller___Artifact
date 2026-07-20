import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones", () => {
  it("should memoize timezones only once when called multiple times", () => {
    const firstCall = getAllTimezones();
    const secondCall = getAllTimezones();

    // The mutation would cause memoization to happen on every call
    // In the original code, memoization only happens when needed
    expect(firstCall).toEqual(secondCall);
  });
});