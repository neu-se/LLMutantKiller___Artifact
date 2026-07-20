import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return timezone objects for valid country", () => {
    const result = getTimezonesForCountry("US");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(tz => tz && typeof tz === 'object')).toBe(true);
  });
});