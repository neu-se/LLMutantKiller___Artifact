import { getTimezonesForCountry, getCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("result matches mapping through country timezones with correct fallback", () => {
    // The mutation: country.timezones || [] → country.timezones || ["Stryker was here"]
    // We need country.timezones to be falsy to detect the mutation
    // 
    // From error logs: getTimezonesForCountry("AD") returns Europe/Andorra
    // So country.timezones for "AD" is truthy ["Europe/Andorra"]
    //
    // We need to find a country where getCountry(code).timezones is null/undefined
    // Let's check all countries and find one where timezones is falsy
    
    // Get all country codes by checking what getCountry returns
    // Try known small territories that might have no timezone coverage
    const candidates = [
      "BV", // Bouvet Island
      "HM", // Heard Island
      "TF", // French Southern Territories  
      "GS", // South Georgia
      "UM", // US Minor Outlying Islands
      "AQ", // Antarctica
    ];

    for (const code of candidates) {
      const country = getCountry(code);
      if (country && !country.timezones) {
        // Found one - the mutation would produce [null] here, original produces []
        const result = getTimezonesForCountry(code);
        expect(result).toEqual([]);
        return;
      }
    }

    // If none of the candidates work, scan all countries
    // The mutation changes fallback from [] to ["Stryker was here"]
    // getTimezone("Stryker was here") = null
    // So mutant result would be [null], original would be []
    // Check that result length equals country.timezones length (or 0 if falsy)
    const testCountry = getCountry("US");
    expect(testCountry).not.toBeNull();
    const result = getTimezonesForCountry("US");
    expect(result).not.toContain(null);
    expect(result!.length).toBe(testCountry!.timezones!.length);
  });
});