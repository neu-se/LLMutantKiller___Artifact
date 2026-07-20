import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should return correct timezones for a country with timezone data", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {
        "America/New_York": { c: ["US"], r: 1 },
        "America/Chicago": { c: ["US"] }
      }
    };

    const result = buildCountry(data, "US");

    expect(result).toEqual({
      id: "US",
      name: "United States",
      timezones: ["America/New_York"],
      allTimezones: ["America/New_York", "America/Chicago"]
    });
  });
});