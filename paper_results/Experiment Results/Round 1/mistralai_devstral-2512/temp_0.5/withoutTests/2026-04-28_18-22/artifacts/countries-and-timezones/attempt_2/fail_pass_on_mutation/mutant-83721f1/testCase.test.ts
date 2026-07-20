import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization behavior", () => {
  it("should only memoize timezones once when called multiple times", () => {
    // Clear any existing memoization
    const timezoneNames = Object.keys((getAllTimezones() as any).timezones || {});
    timezoneNames.forEach(name => {
      (getTimezone as any).clearMemoization(name);
    });

    // Spy on getTimezone to count calls
    const getTimezoneSpy = jest.spyOn({ getTimezone }, 'getTimezone');

    // First call should memoize all timezones
    const firstResult = getAllTimezones();
    const firstCallCount = getTimezoneSpy.mock.calls.length;

    // Second call should not re-memoize if all timezones are already memoized
    const secondResult = getAllTimezones();
    const secondCallCount = getTimezoneSpy.mock.calls.length;

    // Results should be identical
    expect(secondResult).toEqual(firstResult);

    // In original code: secondCallCount should equal firstCallCount (no new calls)
    // In mutated code: secondCallCount will be higher (new calls made)
    expect(secondCallCount).toBe(firstCallCount);

    getTimezoneSpy.mockRestore();
  });
});