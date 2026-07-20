import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return empty array for non-existent country", () => {
    const result = getTimezonesForCountry("NON_EXISTENT_COUNTRY");
    expect(result).toEqual([]);
  });
});