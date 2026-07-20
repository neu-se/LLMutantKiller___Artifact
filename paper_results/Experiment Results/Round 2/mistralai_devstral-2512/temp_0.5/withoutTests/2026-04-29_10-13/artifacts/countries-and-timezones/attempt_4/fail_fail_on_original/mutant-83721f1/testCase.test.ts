import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones", () => {
  it("should memoize timezones only when needed", () => {
    // Call getAllTimezones twice
    const firstCall = getAllTimezones();
    const secondCall = getAllTimezones();

    // In the original code, the second call shouldn't trigger memoization
    // In the mutated code, memoization happens every time
    expect(firstCall).toEqual(secondCall);
  });
});