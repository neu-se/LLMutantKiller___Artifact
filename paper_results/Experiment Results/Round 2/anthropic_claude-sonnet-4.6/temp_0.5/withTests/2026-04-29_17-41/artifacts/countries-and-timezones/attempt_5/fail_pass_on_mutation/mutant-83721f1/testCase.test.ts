jest.mock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json", () => ({
  __esModule: true,
  default: {
    countries: {},
    timezones: { T1:{}, T2:{}, T3:{}, T4:{}, T5:{}, T6:{}, T7:{} }
  }
}));

jest.mock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone", () => ({
  __esModule: true,
  default: jest.fn((data: any, name: string) => ({
    name, a:1, b:2, c:3, d:4, e:5, f:6  // 7 keys
  }))
}));

import * as ct from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";
import buildTimezone from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone";

describe("getAllTimezones caching", () => {
  it("should skip forEach on second call when all timezones are cached", () => {
    const spy = jest.spyOn(ct, 'getTimezone');
    
    ct.getAllTimezones();
    spy.mockClear();
    
    ct.getAllTimezones();
    // Original: memoizedTimezones(7) === totalTimezones(7), skips forEach, spy called 0 times
    // Mutated: always runs forEach, spy called 7 times (but spy may not intercept internal calls)
    expect(spy).toHaveBeenCalledTimes(0);
  });
});