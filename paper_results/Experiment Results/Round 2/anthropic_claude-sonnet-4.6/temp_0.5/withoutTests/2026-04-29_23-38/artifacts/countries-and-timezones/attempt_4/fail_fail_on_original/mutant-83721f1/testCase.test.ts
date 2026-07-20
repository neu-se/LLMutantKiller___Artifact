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

jest.unstable_mockModule(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json",
  () => ({ default: fakeData })
);

jest.unstable_mockModule(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone.js",
  () => ({
    default: (data: any, name: string) => {
      const tz = data.timezones[name];
      if (!tz) return null;
      // Return object with exactly 5 keys = totalTimezones (5)
      return { name, utcOffset: tz.u, dstOffset: tz.d, countries: tz.c, aliasOf: null };
    },
  })
);

jest.unstable_mockModule(
  "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js",
  () => ({ default: () => null })
);

describe("getAllTimezones memoization optimization", () => {
  it("skips forEach when memoizedTimezones equals totalTimezones in original but mutant always runs forEach", async () => {
    const { getAllTimezones, getTimezone } = await import(
      "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js"
    );

    getTimezone("Zone/A"); // memoizedTimezones = 5 = totalTimezones
    const result = getAllTimezones();

    // Original: 5 !== 5 → false → skip forEach → only Zone/A → length 1 → PASS
    // Mutant: true → run forEach → all 5 → length 5 → FAIL
    expect(Object.keys(result).length).toBe(1);
  });
});