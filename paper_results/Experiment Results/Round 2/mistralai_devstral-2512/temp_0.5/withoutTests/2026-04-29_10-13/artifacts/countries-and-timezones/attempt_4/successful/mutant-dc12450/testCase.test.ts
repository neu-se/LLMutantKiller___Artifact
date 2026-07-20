import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry timezone map caching", () => {
  it("should cache timezone map between calls with same data", () => {
    const mockData = {
      countries: {
        "US": "United States",
        "GB": "United Kingdom"
      },
      timezones: {
        "tz1": { c: ["US"] },
        "tz2": { c: ["GB"] }
      }
    };

    // First call builds the map
    const firstResult = buildCountry(mockData, "US");

    // Modify the data object after first call
    mockData.timezones.tz3 = { c: ["US"] };

    // Second call should use cached map (original) or rebuild (mutated)
    const secondResult = buildCountry(mockData, "US");

    // In original code: uses cached map, won't see tz3
    // In mutated code: rebuilds map, will see tz3
    expect(secondResult.timezones).not.toContain("tz3");
  });
});