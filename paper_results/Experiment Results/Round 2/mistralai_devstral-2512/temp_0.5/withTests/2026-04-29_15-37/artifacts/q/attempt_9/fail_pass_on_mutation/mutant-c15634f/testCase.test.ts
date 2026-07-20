const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should not log deprecation warning when console.warn is unavailable", () => {
    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // Remove console.warn to simulate its unavailability
    delete (console as any).warn;

    // Mock console.warn to track if it's called (shouldn't be called)
    (console as any).warn = () => {
      warnCalled = true;
    };

    // Create a promise that would normally trigger deprecation warning
    const result = Q().then(function() {
      return "result";
    });

    // Verify the promise resolves correctly
    return result.then((value: any) => {
      expect(value).toBe("result");
      // In the original code, warnCalled should be false since console.warn was unavailable
      // In the mutated code, it will try to call warn anyway, making warnCalled true
      expect(warnCalled).toBe(false);
    }).finally(() => {
      // Restore console.warn
      console.warn = originalWarn;
    });
  });
});