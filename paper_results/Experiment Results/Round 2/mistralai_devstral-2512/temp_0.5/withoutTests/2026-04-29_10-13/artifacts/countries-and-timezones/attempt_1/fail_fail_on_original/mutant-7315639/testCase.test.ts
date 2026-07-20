import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should return empty array for allTimezones when no timezones are available", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {}
    };
    const result = buildCountry(data, "US");
    expect(result).toEqual({
      id: "US",
      name: "United States",
      timezones: ["Stryker was here"],
      allTimezones: []
    });
  });
});