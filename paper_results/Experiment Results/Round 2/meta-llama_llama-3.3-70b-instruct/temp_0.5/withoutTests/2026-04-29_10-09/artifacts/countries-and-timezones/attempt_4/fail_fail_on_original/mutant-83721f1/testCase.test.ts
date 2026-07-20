import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";

describe("Testing getAllTimezones function", () => {
  it("should only memoize timezones when necessary", () => {
    const memoizedTimezonesBefore = Object.keys(getTimezone('America/New_York'));
    getAllTimezones();
    const memoizedTimezonesAfter = Object.keys(getTimezone('America/New_York'));
    expect(memoizedTimezonesBefore).toHaveLength(1);
    expect(memoizedTimezonesAfter).toHaveLength(1);
  });
});