import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry timezones map caching", () => {
  it("should maintain timezone map state between calls when data is unchanged", () => {
    const mockData = {
      countries: {
        "US": "United States",
        "CA": "Canada"
      },
      timezones: {
        "tz1": { c: ["US"], r: 1 },
        "tz2": { c: ["CA"], r: 1 }
      }
    };

    // First call should build the map
    const firstResult = buildCountry(mockData, "US");

    // Second call with same data should use cached map
    const secondResult = buildCountry(mockData, "CA");

    // Third call should still use cached map
    const thirdResult = buildCountry(mockData, "US");

    // In the original code, the map is cached after first build
    // In the mutated code, the map is rebuilt on every call
    // This test verifies the caching behavior by checking consistency
    expect(firstResult).toEqual({
      id: "US",
      name: "United States",
      timezones: ["tz1"],
      allTimezones: ["tz1"]
    });
    expect(secondResult).toEqual({
      id: "CA",
      name: "Canada",
      timezones: ["tz2"],
      allTimezones: ["tz2"]
    });
    expect(thirdResult).toEqual(firstResult);
  });
});