import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return empty array when country.timezones is undefined", () => {
    const mockCountry = { id: "TEST" }; // No timezones property
    jest.spyOn(require("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js"), "getCountry").mockReturnValue(mockCountry);

    const result = getTimezonesForCountry("TEST");
    expect(result).toEqual([]);
  });
});