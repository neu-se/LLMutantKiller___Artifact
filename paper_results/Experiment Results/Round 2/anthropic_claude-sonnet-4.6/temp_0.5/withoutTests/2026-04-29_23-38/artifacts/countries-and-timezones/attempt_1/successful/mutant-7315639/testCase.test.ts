import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry allTimezones fallback", () => {
  it("should return an empty array for allTimezones when the country has no timezones mapped", () => {
    // Create data where a country exists but has no timezone mappings
    const data = {
      countries: {
        XX: "Nonexistent Country",
      },
      timezones: {
        // No timezones reference country XX
        "America/New_York": { c: ["US"] },
      },
    };

    const result = buildCountry(data, "XX");

    expect(result).not.toBeNull();
    expect(result!.allTimezones).toEqual([]);
    // The mutated code would return ["Stryker was here"] instead of []
    expect(result!.allTimezones).not.toContain("Stryker was here");
  });
});