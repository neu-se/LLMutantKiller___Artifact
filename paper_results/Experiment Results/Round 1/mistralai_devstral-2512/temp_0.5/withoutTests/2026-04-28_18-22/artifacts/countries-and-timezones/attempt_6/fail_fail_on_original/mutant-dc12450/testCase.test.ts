import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should demonstrate timezone map caching behavior with alias timezone", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {
        "America/New_York": { a: "America/Eastern" },
        "America/Eastern": { c: ["US"] }
      }
    };

    const result = buildCountry(data, "US");

    expect(result).toEqual({
      id: "US",
      name: "United States",
      timezones: ["America/New_York"],
      allTimezones: ["America/New_York"]
    });
  });
});