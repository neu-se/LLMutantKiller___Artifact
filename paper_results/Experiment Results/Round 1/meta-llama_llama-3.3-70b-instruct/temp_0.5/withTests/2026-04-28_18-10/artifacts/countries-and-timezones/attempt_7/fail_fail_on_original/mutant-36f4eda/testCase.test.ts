// test/unit/get-timezones-for-country.test.ts
import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return timezones for country with exact names', () => {
    const result = ct.getTimezonesForCountry('MX');
    const expectedNames = ['America/Mexico_City', 'America/Ensenada', 'America/Santa_Isabel', 'Mexico/BajaNorte', 'Mexico/BajaSur', 'Mexico/General', 'America/Bahia_Banderas', 'America/Cancun', 'America/Chihuahua', 'America/Tijuana', 'America/Hermosillo', 'America/Matamoros', 'America/Mazatlan', 'America/Merida', 'America/Mexico_City', 'America/Monterrey', 'America/Ojinaga'];
    const actualNames = result.map(tz => tz.name);
    expect(actualNames).toEqual(expect.arrayContaining(expectedNames));
  });
});