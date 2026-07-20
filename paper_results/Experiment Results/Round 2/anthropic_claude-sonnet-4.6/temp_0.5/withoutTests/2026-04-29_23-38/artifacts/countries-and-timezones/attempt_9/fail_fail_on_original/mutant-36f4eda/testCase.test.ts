import ct from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("returns empty array not [null] when country timezones is null", () => {
    // Spy on getCountry through the default export
    const spy = jest.spyOn(ct, 'getCountry').mockReturnValueOnce({ 
      id: 'XX', 
      name: 'Test', 
      timezones: null as any,
      allTimezones: null as any
    });
    
    const result = ct.getTimezonesForCountry('XX');
    
    // Original: null || [] = [] → result = []
    // Mutant: null || ["Stryker was here"] → [null]
    expect(result).toEqual([]);
    
    spy.mockRestore();
  });
});