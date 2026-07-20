import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should demonstrate timezone map caching with non-existent country", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {
        "America/New_York": { c: ["US"] }
      }
    };

    // First call with valid country
    const validResult = buildCountry(data, "US");
    // Second call with non-existent country
    const nullResult = buildCountry(data, "XX");

    expect(validResult).toEqual({
      id: "US",
      name: "United States",
      timezones: ["America/New_York"],
      allTimezones: ["America/New_York"]
    });
    expect(nullResult).toBeNull();
  });
});