import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should not return timezone with name 'Stryker was here'", () => {
    const result = getTimezonesForCountry("US");
    const hasStrykerTimezone = result.some(tz => tz?.name === "Stryker was here");
    expect(hasStrykerTimezone).toBe(false);
  });
});