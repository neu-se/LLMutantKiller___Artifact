const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function behavior", () => {
  it("should only log deprecation warning when console.warn is available", () => {
    // Store the original console.warn
    const originalWarn = console.warn;
    let warnCalled = false;

    // First test: console.warn is unavailable
    delete (console as any).warn;
    (console as any).warn = () => {
      warnCalled = true;
    };

    // Create a promise that would trigger deprecation check
    const result1 = Q().then(function() {
      return "result1";
    });

    // Verify no warning was called when console.warn was unavailable
    return result1.then((value: any) => {
      expect(value).toBe("result1");
      expect(warnCalled).toBe(false); // Should be false in original, true in mutated

      // Second test: console.warn is available
      warnCalled = false;
      console.warn = () => {
        warnCalled = true;
      };

      const result2 = Q().then(function() {
        return "result2";
      });

      return result2.then((value: any) => {
        expect(value).toBe("result2");
        expect(warnCalled).toBe(true); // Should be true in both cases
      });
    }).finally(() => {
      // Restore console.warn
      console.warn = originalWarn;
    });
  });
});