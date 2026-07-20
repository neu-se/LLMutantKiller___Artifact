import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should cache timezone map and return consistent results for multiple calls", () => {
    const data = {
      countries: { "US": "United States" },
      timezones: {
        "America/New_York": { c: ["US"] },
        "America/Chicago": { c: ["US"] }
      }
    };

    // First call - builds timezone map
    const firstCall = buildCountry(data, "US");
    // Second call - should use cached map
    const secondCall = buildCountry(data, "US");

    expect(firstCall).toEqual(secondCall);
    expect(firstCall.timezones).toEqual(["America/New_York", "America/Chicago"]);
    expect(firstCall.allTimezones).toEqual(["America/New_York", "America/Chicago"]);
  });
});