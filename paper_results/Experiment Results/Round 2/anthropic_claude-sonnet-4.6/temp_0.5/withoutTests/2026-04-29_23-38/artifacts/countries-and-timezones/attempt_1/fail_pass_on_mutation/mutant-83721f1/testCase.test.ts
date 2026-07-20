import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getAllTimezones optimization behavior', () => {
  it('should return all timezones correctly on repeated calls without mutation affecting memoizedTimezones sentinel', () => {
    // The original code uses memoizedTimezones as a sentinel to avoid re-running forEach
    // memoizedTimezones is set to Object.keys(timezone).length after memoization
    // If we can make memoizedTimezones === totalTimezones, original skips but mutant doesn't
    // We verify consistent behavior: getAllTimezones returns same result on multiple calls
    const first = getAllTimezones();
    const second = getAllTimezones();
    
    // Both should return the same timezones
    expect(Object.keys(first).length).toBeGreaterThan(0);
    expect(Object.keys(first)).toEqual(Object.keys(second));
    
    // Verify a specific timezone exists
    const tzKeys = Object.keys(first);
    expect(tzKeys.length).toBeGreaterThan(100);
    
    // The result should not include deprecated timezones by default
    const deprecatedCount = Object.values(first).filter((tz: any) => tz.deprecated).length;
    expect(deprecatedCount).toBe(0);
  });
});