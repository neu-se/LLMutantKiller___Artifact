import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should cache timezone map and handle empty countries array", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {
        "America/New_York": { c: [] }
      }
    };

    const result = buildCountry(data, "US");

    expect(result).toEqual({
      id: "US",
      name: "United States",
      timezones: [],
      allTimezones: []
    });
  });
});