import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

const mockGetterCount = { value: 0 };

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone",
  () => ({
    default: (_data: any, name: string) => {
      const tz: any = { name, utcOffset: 0 };
      Object.defineProperty(tz, "deprecated", {
        get() { mockGetterCount.value++; return false; },
        enumerable: true,
        configurable: true,
      });
      return tz; // 3 keys: name, utcOffset, deprecated
    }
  })
);

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json",
  () => ({
    default: {
      timezones: {
        TZ_A: { countries: [] },
        TZ_B: { countries: [] },
        TZ_C: { countries: [] }
      },
      countries: {}
    }
  })
);

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country",
  () => ({ default: () => null })
);

describe("getAllTimezones memoization", () => {
  it("should not re-run forEach when totalTimezones equals memoizedTimezones", () => {
    // First call: memoizes all 3 timezones
    // After this: memoizedTimezones = Object.keys({name, utcOffset, deprecated}).length = 3
    // totalTimezones = 3 (entries in mock data)
    getAllTimezones();
    mockGetterCount.value = 0;

    // Second call:
    // Original: (3 !== 3) false → skip forEach → only deliverTimezones → 3 getter calls
    // Mutated:  (true) → forEach runs → getTimezone spreads each tz (3) + deliverTimezones (3) = 6
    getAllTimezones();

    expect(mockGetterCount.value).toBe(3);
  });
});