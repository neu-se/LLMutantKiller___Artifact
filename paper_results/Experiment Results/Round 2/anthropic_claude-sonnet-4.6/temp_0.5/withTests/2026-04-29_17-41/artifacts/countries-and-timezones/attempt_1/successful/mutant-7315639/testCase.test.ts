import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry allTimezones fallback", () => {
  it("should return an empty array for allTimezones when a country has no timezone mappings", () => {
    // Create data where the country exists but has no timezone associations
    const data = {
      countries: {
        XX: "Test Country",
      },
      timezones: {
        // No timezones reference country XX
        "America/New_York": {
          c: ["US"],
          u: -300,
          d: -240,
        },
      },
    };

    const result = buildCountry(data, "XX");

    expect(result).not.toBeNull();
    expect(result!.id).toBe("XX");
    expect(result!.allTimezones).toEqual([]);
  });
});