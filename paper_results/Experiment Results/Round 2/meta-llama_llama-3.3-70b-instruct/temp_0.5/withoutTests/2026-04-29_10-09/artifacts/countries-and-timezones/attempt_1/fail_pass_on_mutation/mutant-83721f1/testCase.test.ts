import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";

describe("Testing getAllTimezones function", () => {
  it("should return timezones without deprecated ones by default", () => {
    const timezones = getAllTimezones();
    expect(Object.keys(timezones).length).toBeLessThan(600); // assuming there are more than 600 timezones in total
  });
});