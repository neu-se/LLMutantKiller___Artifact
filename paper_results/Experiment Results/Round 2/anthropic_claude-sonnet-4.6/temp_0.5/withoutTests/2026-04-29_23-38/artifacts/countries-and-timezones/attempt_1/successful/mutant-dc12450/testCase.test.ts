import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry caching behavior", () => {
  it("should use cached timezone map and not rebuild it on subsequent calls with different data", () => {
    const data1 = {
      countries: { US: "United States" },
      timezones: {
        "America/New_York": { c: ["US"] },
      },
    };

    const data2 = {
      countries: { US: "United States" },
      timezones: {
        "Europe/London": { c: ["US"] },
      },
    };

    // First call with data1 - should build and cache the timezone map
    const result1 = buildCountry(data1, "US");
    expect(result1).not.toBeNull();
    expect(result1!.timezones).toContain("America/New_York");

    // Second call with data2 - original code uses cached map (from data1), mutated code rebuilds with data2
    const result2 = buildCountry(data2, "US");
    expect(result2).not.toBeNull();
    
    // Original: still uses cached map from data1, so "America/New_York" should still be there
    // Mutated: rebuilds with data2, so "Europe/London" would be there instead
    expect(result2!.timezones).toContain("America/New_York");
    expect(result2!.timezones).not.toContain("Europe/London");
  });
});