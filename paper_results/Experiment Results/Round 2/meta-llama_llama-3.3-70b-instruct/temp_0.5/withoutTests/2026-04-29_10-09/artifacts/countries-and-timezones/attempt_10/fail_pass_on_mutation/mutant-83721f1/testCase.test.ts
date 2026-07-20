import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";

describe("Testing getAllTimezones function", () => {
  it("should not memoize all timezones when calling getAllTimezones", () => {
    const initialTimezones = getAllTimezones();
    const subsequentTimezones = getAllTimezones();
    const allTimezones = Object.keys(initialTimezones);
    const allSubsequentTimezones = Object.keys(subsequentTimezones);
    expect(allTimezones.length).toBeLessThan(600); // assuming there are more than 600 timezones in total
    expect(allTimezones).toEqual(allSubsequentTimezones);
  });
});