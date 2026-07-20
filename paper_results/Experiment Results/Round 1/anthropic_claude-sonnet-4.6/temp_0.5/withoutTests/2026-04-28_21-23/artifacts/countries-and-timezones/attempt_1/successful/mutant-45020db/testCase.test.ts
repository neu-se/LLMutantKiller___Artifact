import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should return an empty array for timezones when no timezones are mapped to the country", () => {
    // Reset the module-level timezonesMap cache by using a fresh data object
    // with a country that has no timezones associated with it
    const data = {
      countries: {
        "XX": "Test Country"
      },
      timezones: {}
    };

    const result = buildCountry(data, "XX");

    expect(result).not.toBeNull();
    expect(result!.timezones).toEqual([]);
  });
});