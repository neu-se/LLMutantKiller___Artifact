import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization behavior", () => {
  it("should memoize timezones only when necessary", () => {
    // Get initial state
    const initialTimezones = getAllTimezones();
    const initialKeys = Object.keys(initialTimezones);

    // Clear memoization by forcing new timezone lookups
    initialKeys.forEach(key => {
      // This will force re-memoization if called
      const tz = getTimezone(key);
      expect(tz).not.toBeNull();
    });

    // Now call getAllTimezones - in original code it won't re-memoize
    // because memoizedTimezones == totalTimezones
    const afterClear = getAllTimezones();

    // The results should be identical
    expect(afterClear).toEqual(initialTimezones);

    // In mutated code, this will fail because:
    // 1. The condition is always true (if (true))
    // 2. It will try to memoize again, potentially causing differences
    //    in the returned data structure or throwing errors
    expect(Object.keys(afterClear).length).toBe(initialKeys.length);
  });
});