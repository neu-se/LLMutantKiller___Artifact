import { getCountry, getTimezone, getAllCountries, getAllTimezones, getTimezonesForCountry, getCountriesForTimezone, getCountryForTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("Module exports", () => {
  it("should export all expected functions", () => {
    expect(getCountry).toBeDefined();
    expect(getTimezone).toBeDefined();
    expect(getAllCountries).toBeDefined();
    expect(getAllTimezones).toBeDefined();
    expect(getTimezonesForCountry).toBeDefined();
    expect(getCountriesForTimezone).toBeDefined();
    expect(getCountryForTimezone).toBeDefined();
  });
});