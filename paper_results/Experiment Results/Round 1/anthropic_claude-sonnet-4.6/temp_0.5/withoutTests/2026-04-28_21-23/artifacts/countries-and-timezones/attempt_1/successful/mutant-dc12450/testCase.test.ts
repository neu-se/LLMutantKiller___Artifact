import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry caching behavior", () => {
  it("should use cached timezones map and not rebuild on subsequent calls with different data", () => {
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

    // First call - builds the cache with data1
    const result1 = buildCountry(data1, "US");
    
    // Second call with different data - original should use cached result (from data1)
    // Mutated code will rebuild with data2
    const result2 = buildCountry(data2, "US");

    // With original code: result2 uses cached map from data1, so it has America/New_York
    // With mutated code: result2 rebuilds with data2, so it has Europe/London
    expect(result1?.timezones).toContain("America/New_York");
    expect(result2?.timezones).toContain("America/New_York");
    expect(result2?.timezones).not.toContain("Europe/London");
  });
});