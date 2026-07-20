import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return timezone array without default fallback values", () => {
    const mockCountry = { id: "TestCountry", timezones: null };
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