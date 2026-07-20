import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should maintain timezone map caching between multiple calls with different country IDs", () => {
    const data = {
      countries: { "US": "United States", "CA": "Canada" },
      timezones: {
        "America/New_York": { c: ["US"] },
        "America/Toronto": { c: ["CA"] }
      }
    };

    // First call
    const usResult = buildCountry(data, "US");
    // Second call with different country
    const caResult = buildCountry(data, "CA");

    expect(usResult).toEqual({
      id: "US",
      name: "United States",
      timezones: ["America/New_York"],
      allTimezones: ["America/New_York"]
    });

    expect(caResult).toEqual({
      id: "CA",
      name: "Canada",
      timezones: ["America/Toronto"],
      allTimezones: ["America/Toronto"]
    });
  });
});