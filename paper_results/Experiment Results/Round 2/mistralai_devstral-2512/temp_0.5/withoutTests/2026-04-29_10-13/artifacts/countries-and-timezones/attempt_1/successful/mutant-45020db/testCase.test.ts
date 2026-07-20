import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should return empty array for timezones when no current timezone is available", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {}
    };

    const result = buildCountry(data, "US");

    expect(result.timezones).toEqual([]);
  });
});