const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecation warning", () => {
  it("should log a deprecation warning with stack trace when a deprecated function is called", () => {
    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;

    try {
      // Call a deprecated function (allResolved is deprecated in favor of allSettled)
      Q.allResolved([Q.resolve(1)]);

      // Check that console.warn was called with the expected message and stack trace
      expect(mockWarn).toHaveBeenCalled();
      const callArgs = mockWarn.mock.calls[0];
      expect(callArgs[0]).toContain("allResolved is deprecated, use allSettled instead.");
      expect(typeof callArgs[1]).toBe("string");
      expect(callArgs[1].includes("at ")).toBe(true);
    } finally {
      console.warn = originalWarn;
    }
  });
});