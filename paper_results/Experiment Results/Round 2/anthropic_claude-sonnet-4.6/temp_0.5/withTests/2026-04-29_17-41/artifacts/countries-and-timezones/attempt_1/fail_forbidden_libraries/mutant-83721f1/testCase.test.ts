import buildTimezone from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone";
import { timezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";
import { jest } from "@jest/globals";

describe("getAllTimezones caching behavior", () => {
  it("should not call buildTimezone again on second getAllTimezones call after all timezones are cached", async () => {
    const totalTimezones = Object.keys(timezones).length;

    const buildTimezoneSpy = jest.fn(buildTimezone);

    jest.resetModules();
    jest.doMock("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone", () => ({
      __esModule: true,
      default: buildTimezoneSpy,
    }));

    const ct = await import("../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js");

    ct.getAllTimezones();
    const firstCallCount = buildTimezoneSpy.mock.calls.length;
    expect(firstCallCount).toBe(totalTimezones);

    ct.getAllTimezones();
    const secondCallCount = buildTimezoneSpy.mock.calls.length;
    expect(secondCallCount).toBe(totalTimezones);
  });
});