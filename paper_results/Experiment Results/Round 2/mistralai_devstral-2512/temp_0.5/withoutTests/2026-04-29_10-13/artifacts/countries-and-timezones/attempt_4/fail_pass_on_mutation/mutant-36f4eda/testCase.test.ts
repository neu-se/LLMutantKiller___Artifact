import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return correct timezone data structure without default values", () => {
    const result = getTimezonesForCountry("US");
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.every(tz => typeof tz === 'object' && tz !== null)).toBe(true);
    expect(result).not.toContainEqual(expect.objectContaining({ name: "Stryker was here" }));
  });
});