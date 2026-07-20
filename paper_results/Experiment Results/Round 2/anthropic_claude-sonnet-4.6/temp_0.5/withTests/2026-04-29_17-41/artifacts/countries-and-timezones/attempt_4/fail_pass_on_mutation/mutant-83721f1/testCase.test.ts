import buildTimezone from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

const totalTimezones = Object.keys(data.timezones).length;

jest.mock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone", () => {
  const actual = jest.requireActual("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone");
  return { __esModule: true, default: jest.fn((d: any, name: string) => (actual as any).default(d, name)) };
});

describe("getAllTimezones", () => {
  it("should only call getTimezone for uncached timezones", async () => {
    jest.resetModules();
    // Pre-cache some timezones by calling getTimezone
    const { getTimezone, getAllTimezones } = await import("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js");
    const mod = await import("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone");
    const spy = (mod as any).default as jest.Mock;
    
    // Pre-warm with one timezone
    getTimezone('America/New_York');
    expect(spy).toHaveBeenCalledTimes(1);
    
    getAllTimezones();
    // Should build remaining (totalTimezones - 1) new ones
    expect(spy).toHaveBeenCalledTimes(totalTimezones);
    
    getAllTimezones();
    // Should NOT rebuild any - still totalTimezones
    expect(spy).toHaveBeenCalledTimes(totalTimezones);
  });
});