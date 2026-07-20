import proxyquire from "proxyquire";

describe("getAllTimezones", () => {
  it("should not re-iterate timezones when already memoized with matching count", () => {
    let deprecatedGetterCount = 0;
    
    // 3 timezones, timezone object has 3 keys (name, utcOffset, deprecated)
    // So memoizedTimezones = 3 = totalTimezones after first call
    const tzNames = ["TZ_A", "TZ_B", "TZ_C"];
    const tzData: Record<string, any> = {};
    tzNames.forEach(n => { tzData[n] = { countries: [] }; });
    
    const mockBuildTimezone = (_data: any, name: string) => {
      const tz: any = { name, utcOffset: 0 };
      Object.defineProperty(tz, 'deprecated', {
        get() { deprecatedGetterCount++; return false; },
        enumerable: true,
        configurable: true
      });
      return tz; // 3 keys: name, utcOffset, deprecated
    };
    
    const mod = proxyquire("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js", {
      "./data.json": { default: { timezones: tzData, countries: {} } },
      "./build-timezone": { default: mockBuildTimezone },
      "./build-country": { default: () => null },
    });
    
    mod.getAllTimezones(); // First call - memoizes all, memoizedTimezones = 3
    deprecatedGetterCount = 0; // Reset
    
    // Second call
    mod.getAllTimezones();
    
    // In deliverTimezones, deprecated is checked for each of 3 timezones = 3 getter calls
    // If forEach runs (mutated): getTimezone spreads each timezone = 3 more getter calls = 6 total
    // If forEach skipped (original): only deliverTimezones = 3 getter calls
    
    expect(deprecatedGetterCount).toBe(3); // Only deliverTimezones, not forEach
  });
});