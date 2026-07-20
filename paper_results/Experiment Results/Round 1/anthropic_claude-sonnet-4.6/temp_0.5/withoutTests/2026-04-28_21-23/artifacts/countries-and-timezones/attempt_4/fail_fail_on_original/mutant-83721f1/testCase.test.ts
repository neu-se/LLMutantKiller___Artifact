import proxyquire from "proxyquire";

describe("getAllTimezones", () => {
  it("should not re-iterate timezones in forEach when memoizedTimezones equals totalTimezones", () => {
    let deprecatedGetterCount = 0;

    // 3 timezone entries - matches the number of keys in our mock timezone object
    const tzData = {
      TZ_A: { countries: [] },
      TZ_B: { countries: [] },
      TZ_C: { countries: [] },
    };

    // Returns timezone with exactly 3 keys: name, utcOffset, deprecated
    // So Object.keys(timezone).length = 3 = Object.keys(tzData).length = 3
    // After first getAllTimezones: memoizedTimezones = 3 = totalTimezones
    const mockBuildTimezone = (_data: any, name: string) => {
      const tz: any = { name, utcOffset: 0 };
      Object.defineProperty(tz, "deprecated", {
        get() {
          deprecatedGetterCount++;
          return false;
        },
        enumerable: true,
        configurable: true,
      });
      return tz;
    };

    const mod = proxyquire(
      "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js",
      {
        "./data.json": {
          default: { timezones: tzData, countries: {} },
          "@noCallThru": true,
        },
        "./build-timezone.js": {
          default: mockBuildTimezone,
          "@noCallThru": true,
        },
        "./build-country.js": {
          default: () => null,
          "@noCallThru": true,
        },
      }
    );

    // First call: memoizes all 3 timezones
    // memoizedTimezones = Object.keys({name, utcOffset, deprecated}).length = 3
    // totalTimezones = Object.keys(tzData).length = 3
    mod.getAllTimezones();
    deprecatedGetterCount = 0;

    // Second call:
    // Original: (3 !== 3) false → skip forEach → only deliverTimezones runs → 3 getter calls
    // Mutated: (true) → forEach runs → getTimezone spreads each tz (3 calls) + deliverTimezones (3 calls) = 6
    mod.getAllTimezones();

    expect(deprecatedGetterCount).toBe(3);
  });
});