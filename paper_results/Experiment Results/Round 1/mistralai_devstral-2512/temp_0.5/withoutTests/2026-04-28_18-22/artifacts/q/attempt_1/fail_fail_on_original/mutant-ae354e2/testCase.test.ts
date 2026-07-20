import { Q } from "./q";

describe("Q deprecation warning", () => {
  it("should include proper deprecation message with 'is deprecated, use' text", () => {
    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;

    try {
      // Trigger a deprecation warning by calling a deprecated method
      Q.allResolved([Promise.resolve(1)]);

      // Check that the warning was called with the correct message format
      expect(mockWarn).toHaveBeenCalled();
      const warningCall = mockWarn.mock.calls[0][0];
      expect(warningCall).toContain("is deprecated, use");
    } finally {
      console.warn = originalWarn;
    }
  });
});