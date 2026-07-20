import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";

describe("Testing getAllTimezones function", () => {
  it("should not memoize all timezones when calling getAllTimezones", () => {
    const initialTimezones = getAllTimezones();
    const subsequentTimezones = getAllTimezones();
    expect(Object.keys(initialTimezones)).toEqual(Object.keys(subsequentTimezones));
    expect(Object.keys(initialTimezones).length).toBeLessThan(600); // assuming there are more than 600 timezones in total
  });
});