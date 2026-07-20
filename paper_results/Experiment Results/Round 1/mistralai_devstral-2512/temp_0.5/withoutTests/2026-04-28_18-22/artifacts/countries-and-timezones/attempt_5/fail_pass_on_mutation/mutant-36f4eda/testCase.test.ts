import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should not include the string 'Stryker was here' in timezone results", () => {
    const result = getTimezonesForCountry("US");
    const timezoneNames = result.map(tz => tz?.name || '');
    expect(timezoneNames).not.toContain("Stryker was here");
  });
});