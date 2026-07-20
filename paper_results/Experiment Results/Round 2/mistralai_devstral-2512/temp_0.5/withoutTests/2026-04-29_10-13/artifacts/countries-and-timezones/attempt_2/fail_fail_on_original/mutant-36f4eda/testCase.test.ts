import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return an empty array for a country with no timezones", () => {
    const mockCountry = {
      id: "TestCountry",
      timezones: []
    };
    // Mock the getCountry function to return our test country
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