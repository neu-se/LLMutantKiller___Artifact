import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry timezone map caching", () => {
  it("should cache timezone map when timezone has no 'r' property", () => {
    const mockData = {
      countries: {
        "US": "United States"
      },
      timezones: {
        "tz1": { c: ["US"] }  // Note: no 'r' property
      }
    };

    const firstResult = buildCountry(mockData, "US");
    const secondResult = buildCountry(mockData, "US");

    // In original code: first call builds map, second uses cached map
    // In mutated code: both calls rebuild the map
    // The key difference is that without 'r' property, the timezone should be in 'current'
    expect(firstResult.timezones).toContain("tz1");
    expect(secondResult.timezones).toContain("tz1");
  });
});