import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return an empty array when country has no timezones", () => {
    // Mock a country with no timezones
    const mockCountry = { id: "TEST", timezones: [] };
    const originalGetCountry = require("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js").getCountry;
    jest.spyOn(require("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js"), "getCountry").mockReturnValue(mockCountry);

    const result = getTimezonesForCountry("TEST");
    expect(result).toEqual([]);

    // Restore original implementation
    require("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js").getCountry.mockRestore();
  });
});