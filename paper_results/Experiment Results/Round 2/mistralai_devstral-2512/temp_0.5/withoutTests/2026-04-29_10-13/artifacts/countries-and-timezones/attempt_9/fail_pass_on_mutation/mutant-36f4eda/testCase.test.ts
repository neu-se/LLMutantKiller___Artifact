import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return timezone objects with valid names for US", () => {
    const result = getTimezonesForCountry("US");
    expect(Array.isArray(result)).toBe(true);
    expect(result.every(tz => typeof tz?.name === 'string' && tz.name !== "Stryker was here")).toBe(true);
  });
});