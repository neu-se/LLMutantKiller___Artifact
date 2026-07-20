import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";

describe("Testing getAllTimezones function", () => {
  it("should not memoize all timezones when calling getAllTimezones", () => {
    const initialTimezone = getTimezone('America/New_York');
    const initialTimezoneCount = Object.keys(initialTimezone).length;
    getAllTimezones();
    const allTimezones = getAllTimezones();
    const timezoneAfterGetAll = getTimezone('America/New_York');
    expect(Object.keys(allTimezones)).not.toHaveLength(Object.keys(getAllTimezones()).length);
  });
});