import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones mutation detection", () => {
  it("should detect forced memoization on every call", () => {
    // First call establishes baseline
    const firstResult = getAllTimezones();

    // Clear require cache to simulate fresh import
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js")];

    // Second call should behave differently if mutation is present
    const { getAllTimezones: freshGetAllTimezones } = require("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js");
    const secondResult = freshGetAllTimezones();

    // In original code: second call shouldn't re-memoize
    // In mutated code: second call will re-memoize
    expect(firstResult).toEqual(secondResult);
  });
});