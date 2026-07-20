import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe("buildCountry", () => {
  it("should return an empty array for timezones when a country has no current timezones", () => {
    // Create minimal data where a country exists but has no timezones mapped to it
    const data = {
      countries: {
        XX: "Test Country",
      },
      timezones: {},
    };

    const result = buildCountry(data, "XX");

    expect(result).not.toBeNull();
    expect(result!.id).toBe("XX");
    expect(result!.timezones).toEqual([]);
    expect(result!.timezones).not.toContain("Stryker was here");
  });
});