import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should handle country with undefined timezones property", () => {
    const mockCountry = { id: "TestCountry", timezones: undefined };
    jest.mock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js", () => {
      const originalModule = jest.requireActual("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js");
      return {
        ...originalModule,
        getCountry: jest.fn().mockReturnValue(mockCountry)
      };
    });

    const result = getTimezonesForCountry("TestCountry");
    expect(result).toEqual([]);
  });
});