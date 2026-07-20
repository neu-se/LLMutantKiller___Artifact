import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should return an empty array for timezones when country has no timezone data", () => {
    // Create minimal data where a country exists but has no timezone mappings
    const data = {
      countries: {
        XX: "Test Country",
      },
      timezones: {},
    };

    const result = buildCountry(data, "XX");

    expect(result).not.toBeNull();
    expect(result!.id).toBe("XX");
    expect(result!.name).toBe("Test Country");
    // In original code: tzMap.current || [] => [] (empty array)
    // In mutated code: tzMap.current || ["Stryker was here"] => ["Stryker was here"]
    expect(result!.timezones).toEqual([]);
  });
});