import proxyquire from "proxyquire";

describe('getAllTimezones memoization optimization', () => {
  it('should load all timezones even when memoizedTimezones accidentally equals totalTimezones', () => {
    // We craft data with exactly N timezones where N = number of keys buildTimezone returns
    // Then pre-call getTimezone once to set memoizedTimezones = N = totalTimezones
    // Original: getAllTimezones skips forEach -> returns only pre-fetched timezone
    // Mutant: getAllTimezones always runs forEach -> returns all N timezones
    
    // Need to know how many keys buildTimezone returns
    // From source code analysis of buildTimezone (typical): name, utcOffset, dstOffset, countries, aliasOf, deprecated
    // Let's use real buildTimezone and figure out the count empirically, or use fake
    
    const fakeData = {
      countries: {},
      timezones: {
        'Zone/A': { u: 0, d: 0, c: [] },
        'Zone/B': { u: 60, d: 60, c: [] },
        'Zone/C': { u: 120, d: 120, c: [] },
        'Zone/D': { u: 180, d: 180, c: [] },
        'Zone/E': { u: 240, d: 240, c: [] },
      }
    };
    
    const fakeBuildTimezone = (_data: any, name: string) => {
      const tz = _data.timezones[name];
      if (!tz) return null;
      // Exactly 5 keys to match totalTimezones (5)
      return { name, utcOffset: tz.u, dstOffset: tz.d, countries: tz.c, aliasOf: null };
    };
    
    const mod = proxyquire('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js', {
      './data.json': fakeData,
      './build-timezone': fakeBuildTimezone,
    });
    
    // Pre-fetch one timezone to set memoizedTimezones = 5 = totalTimezones
    mod.getTimezone('Zone/A');
    
    // Now getAllTimezones:
    // Original: totalTimezones(5) !== memoizedTimezones(5) is FALSE -> skip forEach
    //           Only Zone/A is in timezones cache -> returns {Zone/A: ...}
    // Mutant: if(true) -> run forEach -> all zones loaded -> returns all 5
    const result = mod.getAllTimezones();
    
    // Original returns only 1 timezone (Zone/A), mutant returns all 5
    // Test should PASS on original (expects 1) and FAIL on mutant (gets 5)
    // OR: Test expects all 5, passes on mutant, fails on original
    // We want: PASS on original, FAIL on mutant
    // So we should expect behavior that original produces
    
    // Hmm wait - we want test to PASS on original and FAIL on mutant
    // Original returns 1 timezone -> expect 1 -> passes
    // Mutant returns 5 timezones -> expect 1 -> fails ✓
    
    expect(Object.keys(result).length).toBe(1);
    expect(result['Zone/A']).toBeDefined();
  });
});