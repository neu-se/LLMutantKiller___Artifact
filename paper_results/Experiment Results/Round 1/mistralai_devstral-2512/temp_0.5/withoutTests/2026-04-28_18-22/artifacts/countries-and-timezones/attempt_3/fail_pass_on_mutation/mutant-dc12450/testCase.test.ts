import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should return empty timezones array when timezone has r property", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {
        "America/New_York": { c: ["US"], r: 1 }
      }
    };

    const result = buildCountry(data, "US");

    expect(result).toEqual({
      id: "US",
      name: "United States",
      timezones: [],
      allTimezones: ["America/New_York"]
    });
  });
});