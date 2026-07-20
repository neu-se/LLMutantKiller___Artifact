jest.mock(
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

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone",
  () => ({
    default: function(data: any, name: string) {
      const tz = data.timezones[name];
      if (!tz) return null;
      // Return object with exactly 5 keys = totalTimezones (5 timezones in data)
      return { name, utcOffset: tz.u, dstOffset: tz.d, countries: tz.c, aliasOf: null };
    },
  })
);

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country",
  () => ({
    default: function() { return null; },
  })
);

import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization", () => {
  it("original skips forEach when memoizedTimezones equals totalTimezones, mutant always runs forEach", () => {
    // Pre-fetch Zone/A: memoizedTimezones = Object.keys({name,utcOffset,dstOffset,countries,aliasOf}).length = 5
    // totalTimezones = Object.keys(data.timezones).length = 5
    // So memoizedTimezones === totalTimezones after this call
    getTimezone("Zone/A");

    const result = getAllTimezones();
    // Original: 5 !== 5 → false → skip forEach → only Zone/A in cache → length 1 → PASS
    // Mutant: true → run forEach → all 5 loaded → length 5 → FAIL
    expect(Object.keys(result).length).toBe(1);
    expect((result as any)["Zone/A"]).toBeDefined();
  });
});