import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('getAllTimezones', () => {
  it('should return correct non-deprecated timezones count', () => {
    const allTzs = getAllTimezones();
    const deprecatedCount = Object.values((data as any).timezones).filter((tz: any) => tz.deprecated || tz.r).length;
    const expectedCount = Object.keys((data as any).timezones).length - deprecatedCount;
    expect(Object.keys(allTzs).length).toBe(expectedCount);
    
    // Call again - should return same result
    const allTzs2 = getAllTimezones();
    expect(Object.keys(allTzs2).length).toBe(expectedCount);
  });
});