import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return an empty array when country has no timezones", () => {
    const result = getTimezonesForCountry("AQ"); // Antarctica has no timezones in the data
    expect(result).toEqual([]);
  });
});