import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

const mockGetterCount = { value: 0 };

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json",
  () => ({
    timezones: {
      TZ_A: { countries: [] },
      TZ_B: { countries: [] },
      TZ_C: { countries: [] },
    },
    countries: {},
  })
);

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone",
  () => {
    const fn = (_data: any, name: string) => {
      const tz: any = { name, utcOffset: 0 };
      Object.defineProperty(tz, "deprecated", {
        get() {
          mockGetterCount.value++;
          return false;
        },
        enumerable: true,
        configurable: true,
      });
      return tz;
    };
    return { __esModule: true, default: fn };
  }
);

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country",
  () => ({ __esModule: true, default: () => null })
);

describe("getAllTimezones memoization", () => {
  it("should not re-run forEach when totalTimezones equals memoizedTimezones after first call", () => {
    // First call: memoizes all 3 timezones
    // memoizedTimezones = Object.keys({name, utcOffset, deprecated}).length = 3
    // totalTimezones = Object.keys({TZ_A, TZ_B, TZ_C}).length = 3
    // So after first call: totalTimezones === memoizedTimezones
    getAllTimezones();
    mockGetterCount.value = 0;

    // Second call:
    // Original: (3 !== 3) false → skip forEach → only deliverTimezones → 3 getter calls
    // Mutated: (true) → forEach + deliverTimezones → 6 getter calls
    getAllTimezones();

    expect(mockGetterCount.value).toBe(3);
  });
});