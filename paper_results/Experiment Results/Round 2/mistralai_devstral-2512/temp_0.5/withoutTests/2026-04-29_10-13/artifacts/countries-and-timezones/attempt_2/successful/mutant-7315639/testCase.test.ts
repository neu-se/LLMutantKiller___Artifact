import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should return empty array for allTimezones when country has no timezone data", () => {
    const data = {
      countries: { "XX": "Test Country" },
      timezones: {
        "America/New_York": { c: ["US"] }
      }
    };
    const result = buildCountry(data, "XX");
    expect(result.allTimezones).toEqual([]);
  });
});