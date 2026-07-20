import * as ct from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return empty array when country timezones is null", () => {
    const spy = jest.spyOn(ct, 'getCountry').mockReturnValue({ 
      id: 'XX', 
      name: 'Test Country', 
      timezones: null as any,
      allTimezones: null as any
    });
    
    try {
      const result = ct.getTimezonesForCountry('XX');
      // Original: null || [] = [] → []
      // Mutant: null || ["Stryker was here"] → [null]
      expect(result).toEqual([]);
    } finally {
      spy.mockRestore();
    }
  });
});