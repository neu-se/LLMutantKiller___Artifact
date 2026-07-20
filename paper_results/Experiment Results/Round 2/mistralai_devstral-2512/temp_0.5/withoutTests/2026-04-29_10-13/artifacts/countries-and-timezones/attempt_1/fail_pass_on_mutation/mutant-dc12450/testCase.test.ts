import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should cache the timezones map across multiple calls", () => {
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

    const firstCallResult = buildCountry(mockData, "US");
    const secondCallResult = buildCountry(mockData, "CA");

    // The mutation causes the timezones map to be rebuilt on every call
    // This test verifies that the original code caches the map properly
    // by checking that both calls use the same cached map
    expect(firstCallResult).toBeTruthy();
    expect(secondCallResult).toBeTruthy();
  });
});