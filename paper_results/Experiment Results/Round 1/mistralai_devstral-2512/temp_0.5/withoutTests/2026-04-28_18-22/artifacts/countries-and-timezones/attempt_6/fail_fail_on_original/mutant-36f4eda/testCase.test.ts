import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should handle country with undefined timezones property", () => {
    const mockCountry = { id: "TEST", timezones: undefined };
    jest.spyOn(require("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js"), "getCountry").mockReturnValue(mockCountry);

    const result = getTimezonesForCountry("TEST");
    expect(result).toEqual([]);
  });
});