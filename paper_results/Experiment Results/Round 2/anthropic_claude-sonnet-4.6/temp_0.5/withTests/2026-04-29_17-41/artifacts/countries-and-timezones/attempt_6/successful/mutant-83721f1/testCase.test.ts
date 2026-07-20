import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe("getAllTimezones caching condition", () => {
  it("skips forEach when memoizedTimezones equals totalTimezones", () => {
    let ct: any;
    let buildTimezoneMock: jest.Mock;
    
    jest.isolateModules(() => {
      buildTimezoneMock = jest.fn((_data: any, name: string) => ({
        name, k1: 1, k2: 2, k3: 3, k4: 4, k5: 5, k6: 6
      }));
      
      jest.doMock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json", () => ({
        __esModule: true,
        default: {
          countries: {},
          timezones: { T1:{}, T2:{}, T3:{}, T4:{}, T5:{}, T6:{}, T7:{} }
        }
      }));
      
      jest.doMock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone", () => ({
        __esModule: true,
        default: buildTimezoneMock
      }));
      
      ct = require("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js");
    });
    
    ct.getTimezone("T1");
    const result = ct.getAllTimezones({ deprecated: true });
    expect(Object.keys(result).length).toBe(1);
  });
});