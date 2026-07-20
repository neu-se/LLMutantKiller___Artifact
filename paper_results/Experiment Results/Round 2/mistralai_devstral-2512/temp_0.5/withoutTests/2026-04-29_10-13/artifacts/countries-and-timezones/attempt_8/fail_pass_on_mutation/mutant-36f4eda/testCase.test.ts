import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return array of timezone objects for valid country", () => {
    const result = getTimezonesForCountry("US");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('name');
    expect(result).not.toContainEqual(expect.objectContaining({ name: "Stryker was here" }));
  });
});