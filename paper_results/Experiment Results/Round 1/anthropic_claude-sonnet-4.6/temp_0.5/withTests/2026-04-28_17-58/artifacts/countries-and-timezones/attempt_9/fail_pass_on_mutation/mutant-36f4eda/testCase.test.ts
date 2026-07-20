import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return only valid timezone objects with deprecated true, not containing null', () => {
    // If buildCountry doesn't set allTimezones for countries with no deprecated timezones,
    // then deprecated:true causes country.timezones to be undefined (falsy)
    // Original returns [] -> []  
    // Mutated returns ["Stryker was here"] -> [null]
    const result = getTimezonesForCountry('KR', { deprecated: true }) as any[];
    // KR has deprecated timezone ROK, so allTimezones should be set
    // But let's check a country that definitely has NO deprecated timezones
    // and verify the result doesn't contain null
    expect(result.every((tz: any) => tz !== null)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});