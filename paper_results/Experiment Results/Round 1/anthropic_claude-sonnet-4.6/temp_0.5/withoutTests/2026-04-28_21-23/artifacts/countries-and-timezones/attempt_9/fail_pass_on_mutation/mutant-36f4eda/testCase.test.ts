import { getTimezonesForCountry, getCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return same timezones with deprecated:true for country with no deprecated timezones", () => {
    // If buildCountry only sets allTimezones for countries WITH deprecated timezones,
    // then for JP (no deprecated timezones), allTimezones would be undefined
    // getCountry("JP", {deprecated:true}).timezones would be undefined (falsy)
    // Original: undefined || [] = [] 
    // Mutant: undefined || ["Stryker was here"] → [null]
    
    const withDep = getTimezonesForCountry("JP", { deprecated: true });
    expect(withDep).not.toContain(null);
    expect(withDep.length).toBeGreaterThan(0);
  });
});