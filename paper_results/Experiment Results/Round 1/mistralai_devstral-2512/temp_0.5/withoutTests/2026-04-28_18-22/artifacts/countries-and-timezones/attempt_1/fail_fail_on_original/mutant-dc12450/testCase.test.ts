import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should cache the timezones map across multiple calls", () => {
    const data = {
      countries: { "US": "United States", "CA": "Canada" },
      timezones: {
        "America/New_York": { c: ["US"], r: 1 },
        "America/Toronto": { c: ["CA"] }
      }
    };

    // First call - should build the timezones map
    const country1 = buildCountry(data, "US");
    // Second call - should use the cached timezones map
    const country2 = buildCountry(data, "CA");

    expect(country1).toEqual({
      id: "US",
      name: "United States",
      timezones: ["America/New_York"],
      allTimezones: ["America/New_York"]
    });

    expect(country2).toEqual({
      id: "CA",
      name: "Canada",
      timezones: ["America/Toronto"],
      allTimezones: ["America/Toronto"]
    });
  });
});