import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe("buildCountry", () => {
  it("should return empty array for timezones when country has no current timezones", () => {
    // Create a mock data object where a country exists but has no current timezones
    const mockData = {
      countries: { XX: "Test Country" },
      timezones: {}
    };

    const result = buildCountry(mockData, "XX");

    expect(result).not.toBeNull();
    expect(result?.timezones).toEqual([]);
    expect(result?.timezones).not.toContain("Stryker was here");
  });
});