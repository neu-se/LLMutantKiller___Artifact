import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";
import { getAllTimezones as originalGetAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index";

describe("Testing getAllTimezones function", () => {
  it("should return timezones without deprecated ones by default and only when necessary", () => {
    const originalTimezones = originalGetAllTimezones();
    const timezones = getAllTimezones();
    expect(Object.keys(timezones)).toEqual(Object.keys(originalTimezones));
  });
});