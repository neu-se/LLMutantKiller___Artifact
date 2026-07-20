import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

const totalTimezones = Object.keys(data.timezones).length;

jest.mock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone", () => {
  const actual = jest.requireActual("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone");
  return { __esModule: true, default: jest.fn((d: any, name: string) => (actual as any).default(d, name)) };
});

describe("getAllTimezones caching", () => {
  it("should cache all timezones after first call so buildTimezone is not called again on second getAllTimezones", async () => {
    const { getAllTimezones } = await import("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js");
    const mod = await import("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone");
    const buildTimezoneMock = (mod as any).default as jest.Mock;

    getAllTimezones();
    expect(buildTimezoneMock).toHaveBeenCalledTimes(totalTimezones);

    getAllTimezones();
    expect(buildTimezoneMock).toHaveBeenCalledTimes(totalTimezones);
  });
});