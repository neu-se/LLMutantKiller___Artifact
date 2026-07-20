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
  () => ({
    default: (_data: any, name: string) => {
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
    },
  })
);

jest.mock(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country",
  () => ({ default: () => null })
);

describe("getAllTimezones memoization", () => {
  it("should not re-run forEach when totalTimezones equals memoizedTimezones after first call", () => {
    getAllTimezones();
    mockGetterCount.value = 0;
    getAllTimezones();
    expect(mockGetterCount.value).toBe(3);
  });
});