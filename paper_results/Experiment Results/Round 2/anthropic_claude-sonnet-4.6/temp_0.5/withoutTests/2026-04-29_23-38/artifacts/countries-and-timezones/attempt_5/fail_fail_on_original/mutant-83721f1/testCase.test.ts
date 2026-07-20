jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json",
  () => {
    const fakeData = {
      countries: {},
      timezones: {
        "Zone/A": { u: 0, d: 0, c: [] },
        "Zone/B": { u: 60, d: 60, c: [] },
        "Zone/C": { u: 120, d: 120, c: [] },
        "Zone/D": { u: 180, d: 180, c: [] },
        "Zone/E": { u: 240, d: 240, c: [] },
      },
    };
    return { default: fakeData, ...fakeData };
  }
);

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone",
  () => ({
    default: (data: any, name: string) => {
      const tz = data.timezones[name];
      if (!tz) return null;
      // Return object with exactly 5 keys = totalTimezones (5)
      return { name, utcOffset: tz.u, dstOffset: tz.d, countries: tz.c, aliasOf: null };
    },
  })
);

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country",
  () => ({ default: () => null })
);

import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization", () => {
  it("skips forEach when memoizedTimezones equals totalTimezones", () => {
    getTimezone("Zone/A"); // sets memoizedTimezones = 5 = totalTimezones
    const result = getAllTimezones();
    // Original: 5 !== 5 → false → skip → only Zone/A → length 1 → PASS
    // Mutant: true → run forEach → all 5 → length 5 → FAIL
    expect(Object.keys(result).length).toBe(1);
  });
});