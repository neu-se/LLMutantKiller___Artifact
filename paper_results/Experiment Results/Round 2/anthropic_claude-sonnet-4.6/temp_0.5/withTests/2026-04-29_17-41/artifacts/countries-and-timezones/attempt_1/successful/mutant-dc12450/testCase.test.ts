import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry timezones map caching behavior", () => {
  it("should use cached timezones map on subsequent calls with different data", () => {
    const data1 = {
      countries: { US: "United States of America" },
      timezones: {
        "America/New_York": { c: ["US"] },
        "America/Los_Angeles": { c: ["US"] },
      },
    };

    // First call - builds and caches the timezones map
    const result1 = buildCountry(data1, "US");
    expect(result1).not.toBeNull();
    expect(result1!.timezones).toContain("America/New_York");
    expect(result1!.timezones).toContain("America/Los_Angeles");

    // Second call with different data (no timezones for US)
    const data2 = {
      countries: { US: "United States of America" },
      timezones: {
        "Europe/London": { c: ["GB"] },
      },
    };

    const result2 = buildCountry(data2, "US");
    expect(result2).not.toBeNull();

    // In the original code, the timezones map is cached from the first call,
    // so result2 should still have US timezones from data1.
    // In the mutated code, the map is rebuilt with data2, which has no US timezones,
    // so result2.timezones would be empty.
    expect(result2!.timezones).toContain("America/New_York");
    expect(result2!.timezones).toContain("America/Los_Angeles");
  });
});