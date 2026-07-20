import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should demonstrate timezone map caching with multiple timezone entries", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {
        "America/New_York": { c: ["US"] },
        "America/Chicago": { c: ["US"] },
        "America/Denver": { c: ["US"] }
      }
    };

    // First call
    const firstResult = buildCountry(data, "US");
    // Second call with modified data (should still use cached map)
    data.timezones["America/Los_Angeles"] = { c: ["US"] };
    const secondResult = buildCountry(data, "US");

    expect(firstResult.timezones).toEqual(["America/New_York", "America/Chicago", "America/Denver"]);
    expect(secondResult.timezones).toEqual(["America/New_York", "America/Chicago", "America/Denver"]);
  });
});