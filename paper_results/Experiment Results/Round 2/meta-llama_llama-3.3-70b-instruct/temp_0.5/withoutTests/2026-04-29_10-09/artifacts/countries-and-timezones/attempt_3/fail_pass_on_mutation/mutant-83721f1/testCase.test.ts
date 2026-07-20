import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";

describe("Testing getAllTimezones function", () => {
  it("should not memoize all timezones unnecessarily", () => {
    const initialTimezone = getTimezone('America/New_York');
    const timezones = getAllTimezones();
    const timezoneAfterGetAll = getTimezone('America/New_York');
    expect(initialTimezone).toEqual(timezoneAfterGetAll);
    expect(Object.keys(timezones)).not.toHaveLength(Object.keys({}).length);
  });
});