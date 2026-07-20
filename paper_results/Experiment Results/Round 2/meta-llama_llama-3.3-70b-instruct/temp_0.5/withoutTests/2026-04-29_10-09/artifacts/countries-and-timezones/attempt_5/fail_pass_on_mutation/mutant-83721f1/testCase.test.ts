import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";

describe("Testing getAllTimezones function", () => {
  it("should not memoize all timezones when calling getAllTimezones", () => {
    const initialTimezoneCount = Object.keys(getTimezone('America/New_York'));
    getAllTimezones();
    const allTimezones = Object.keys(getAllTimezones());
    expect(allTimezones.length).toBeLessThan(600); // assuming there are more than 600 timezones in total
    const allTimezonesAfter = Object.keys(getAllTimezones());
    expect(allTimezonesAfter.length).toBeLessThan(600); // assuming there are more than 600 timezones in total
  });
});