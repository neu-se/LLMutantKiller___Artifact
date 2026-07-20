const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should include 'instead.' in the deprecation warning message", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    // Try to trigger a deprecation warning by using a deprecated function
    // Based on the Q library, some functions might be deprecated
    if (Q.allResolved) {
      // allResolved is deprecated in favor of allSettled
      Q.allResolved([Q(1), Q(2)]);
    } else if (Q.fbind) {
      // Try another potentially deprecated function
      Q.fbind(() => {}, 1);
    }

    // Check if any warning was logged
    const warnCalls = consoleWarnSpy.mock.calls;
    if (warnCalls.length > 0) {
      const warningMessage = warnCalls[0][0];
      expect(warningMessage).toContain(" instead.");
    } else {
      // If no warning was triggered, we need to find another way
      // Let's try to access the deprecate function through the module's internal structure
      const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");
      const moduleCode = qFactory.toString();

      // Check if the source contains the expected string pattern
      expect(moduleCode).toContain('" instead.", new Error("").stack)');
      expect(moduleCode).not.toContain('"", new Error("").stack)');
    }

    consoleWarnSpy.mockRestore();
  });
});