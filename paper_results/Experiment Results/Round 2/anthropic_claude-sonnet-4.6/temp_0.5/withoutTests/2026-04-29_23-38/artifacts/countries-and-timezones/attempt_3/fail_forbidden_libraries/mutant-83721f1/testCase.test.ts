import { jest } from "@jest/globals";

// Mock data with exactly 5 timezones
jest.unstable_mockModule(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json",
  () => ({
    default: {
      countries: {},
      timezones: {
        "Zone/A": { u: 0, d: 0, c: [] },
        "Zone/B": { u: 60, d: 60, c: [] },
        "Zone/C": { u: 120, d: 120, c: [] },
        "Zone/D": { u: 180, d: 180, c: [] },
        "Zone/E": { u: 240, d: 240, c: [] },
      },
    },
  })
);

// Mock buildTimezone to return object with exactly 5 keys (= totalTimezones)
jest.unstable_mockModule(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone.js",
  () => ({
    default: (_data: any, name: string) => {
      const tz = _data.timezones[name];
      if (!tz) return null;
      return { name, utcOffset: tz.u, dstOffset: tz.d, countries: tz.c, aliasOf: null };
      // 5 keys: name, utcOffset, dstOffset, countries, aliasOf
    },
  })
);

jest.unstable_mockModule(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js",
  () => ({ default: () => null })
);

describe("getAllTimezones memoization optimization", () => {
  it("skips forEach when memoizedTimezones equals totalTimezones (original passes, mutant fails)", async () => {
    const { getAllTimezones, getTimezone } = await import(
      "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js"
    );

    // Pre-fetch Zone/A: sets memoizedTimezones = 5 (keys in timezone object) = totalTimezones (5)
    getTimezone("Zone/A");

    // Original: 5 !== 5 → false → skip forEach → only Zone/A in cache → returns {Zone/A}
    // Mutant: true → run forEach → all 5 loaded → returns all 5
    const result = getAllTimezones();

    // Original returns 1 timezone → test PASSES
    // Mutant returns 5 timezones → test FAILS
    expect(Object.keys(result).length).toBe(1);
    expect(result["Zone/A"]).toBeDefined();
  });
});