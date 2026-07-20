import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

const totalTimezones = Object.keys(data.timezones).length;

jest.mock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone", () => {
  const actual = jest.requireActual("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone");
  return { __esModule: true, default: jest.fn((d: any, name: string) => (actual as any).default(d, name)) };
});

describe("getAllTimezones caching", () => {
  it("should call buildTimezone exactly totalTimezones times after two getAllTimezones calls", async () => {
    const { getAllTimezones } = await import("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js");
    const mod = await import("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone");
    const buildTimezoneMock = (mod as any).default as jest.Mock;

    getAllTimezones();
    getAllTimezones();
    // With original: forEach runs both times (condition always true), but getTimezone caches, so buildTimezone called totalTimezones times
    // With mutated: same behavior
    expect(buildTimezoneMock).toHaveBeenCalledTimes(totalTimezones);
  });
});