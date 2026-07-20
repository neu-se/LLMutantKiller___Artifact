import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getAllTimezones', () => {
  it('should return timezones with valid structure on repeated calls', () => {
    const result1 = getAllTimezones({ deprecated: true });
    const result2 = getAllTimezones({ deprecated: false });
    
    // Every timezone in result2 should not be deprecated
    Object.values(result2).forEach((tz: any) => {
      expect(tz.deprecated).not.toBe(true);
    });
    
    // result1 should have more timezones than result2
    expect(Object.keys(result1).length).toBeGreaterThan(Object.keys(result2).length);
  });
});