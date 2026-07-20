const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecation warning", () => {
  it("should log a deprecation warning when a deprecated function is called", () => {
    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;

    try {
      // Call a deprecated function (allResolved is deprecated in favor of allSettled)
      Q.allResolved([Q.resolve(1)]);
      expect(mockWarn).toHaveBeenCalledWith(
        expect.stringContaining("allResolved is deprecated, use allSettled instead.")
      );
    } finally {
      console.warn = originalWarn;
    }
  });
});