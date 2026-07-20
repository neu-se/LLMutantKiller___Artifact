import subject from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("Default export", () => {
  it("should contain all expected functions", () => {
    expect(subject.getCountry).toBeDefined();
    expect(subject.getTimezone).toBeDefined();
    expect(subject.getAllCountries).toBeDefined();
    expect(subject.getAllTimezones).toBeDefined();
    expect(subject.getTimezonesForCountry).toBeDefined();
    expect(subject.getCountriesForTimezone).toBeDefined();
    expect(subject.getCountryForTimezone).toBeDefined();
  });
});