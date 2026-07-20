import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry timezone caching behavior", () => {
  it("should cache the timezones map and not rebuild it on subsequent calls with different data", () => {
    // First call with data that has a timezone for country 'US'
    const data1 = {
      countries: { US: "United States" },
      timezones: {
        "America/New_York": { c: ["US"] },
      },
    };

    const result1 = buildCountry(data1, "US");
    expect(result1).not.toBeNull();
    expect(result1!.timezones).toContain("America/New_York");

    // Second call with different data that has a different timezone for 'US'
    const data2 = {
      countries: { US: "United States" },
      timezones: {
        "America/Los_Angeles": { c: ["US"] },
      },
    };

    const result2 = buildCountry(data2, "US");
    expect(result2).not.toBeNull();

    // With the original code (caching), the timezones map is built once from data1,
    // so result2 should still have "America/New_York" (from the cached map)
    // and NOT have "America/Los_Angeles" (from data2)
    //
    // With the mutated code (no caching), the timezones map is rebuilt from data2,
    // so result2 would have "America/Los_Angeles" and NOT "America/New_York"
    expect(result2!.timezones).toContain("America/New_York");
    expect(result2!.timezones).not.toContain("America/Los_Angeles");
  });
});