// Test case to detect the mutation in the deprecate function
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deprecate function", () => {
  it("should log a deprecation warning when a deprecated function is called", () => {
    // Access the Q object from the module
    const Q = (qModule as any).default || qModule;

    // Mock console.warn to capture the warning message
    const originalWarn = console.warn;
    const warnMessages: any[] = [];
    console.warn = (...args: any[]) => {
      warnMessages.push(args);
    };

    try {
      // Access the deprecate function from the Q object
      const deprecate = Q.deprecate;

      // Create a deprecated function
      const deprecatedFunc = deprecate(
        () => "result",
        "oldFunction",
        "newFunction"
      );

      // Call the deprecated function
      const result = deprecatedFunc();

      // Verify the function still works
      expect(result).toBe("result");

      // Verify the deprecation warning was logged
      expect(warnMessages.length).toBeGreaterThan(0);
      expect(warnMessages[0][0]).toContain("oldFunction is deprecated, use newFunction instead.");

      // Verify a stack trace was included
      expect(warnMessages[0][1]).toBeInstanceOf(Error);
    } finally {
      // Restore original console.warn
      console.warn = originalWarn;
    }
  });
});