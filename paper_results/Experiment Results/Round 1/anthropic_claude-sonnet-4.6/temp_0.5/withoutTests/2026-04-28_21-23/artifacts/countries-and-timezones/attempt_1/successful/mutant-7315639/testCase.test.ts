import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry allTimezones fallback", () => {
  it("should return an empty array for allTimezones when country has no timezones", () => {
    const data = {
      countries: {
        "XX": "Test Country"
      },
      timezones: {}
    };

    const result = buildCountry(data, "XX");

    expect(result).not.toBeNull();
    expect(result!.allTimezones).toEqual([]);
  });
});