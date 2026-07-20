import { getTimezonesForCountry, getCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('result length should match country timezones length for all options combinations', () => {
    // When deprecated:true, getCountry returns allTimezones
    // If allTimezones is undefined for some country, country.timezones is falsy
    // and the mutation would return [null] instead of []
    const country = getCountry('KR', { deprecated: true }) as any;
    const result = getTimezonesForCountry('KR', { deprecated: true }) as any[];
    expect(result.length).toBe(country.timezones.length);
    result.forEach((tz: any) => expect(tz).not.toBeNull());
  });
});