import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should cache timezone map and handle multiple calls with same country", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {
        "America/New_York": { c: ["US"], r: 1 },
        "America/Chicago": { c: ["US"] }
      }
    };

    // First call - builds timezone map
    const firstResult = buildCountry(data, "US");
    // Second call - should use cached map
    const secondResult = buildCountry(data, "US");

    expect(firstResult).toEqual(secondResult);
    expect(firstResult.timezones).toEqual(["America/Chicago"]);
    expect(firstResult.allTimezones).toEqual(["America/New_York", "America/Chicago"]);
  });
});