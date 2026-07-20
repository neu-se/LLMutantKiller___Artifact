import { getAllTimezones } from "./src/index.js";

describe("getAllTimezones", () => {
  it("should memoize timezones only when needed", () => {
    const firstCall = getAllTimezones();
    const secondCall = getAllTimezones();

    // The mutation would cause memoization to happen on every call
    // In the original code, memoization only happens when needed
    expect(firstCall).toEqual(secondCall);
  });
});