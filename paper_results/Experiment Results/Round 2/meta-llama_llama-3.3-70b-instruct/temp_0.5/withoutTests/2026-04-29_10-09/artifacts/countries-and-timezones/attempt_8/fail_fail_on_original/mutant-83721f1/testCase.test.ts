import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";

describe("Testing getAllTimezones function", () => {
  it("should not memoize all timezones when calling getAllTimezones", () => {
    const initialTimezone = getTimezone('America/New_York');
    const initialMemoizedTimezones = Object.keys(getAllTimezones()).length;
    getAllTimezones();
    const subsequentMemoizedTimezones = Object.keys(getAllTimezones()).length;
    expect(initialMemoizedTimezones).toBeLessThan(subsequentMemoizedTimezones);
  });
});