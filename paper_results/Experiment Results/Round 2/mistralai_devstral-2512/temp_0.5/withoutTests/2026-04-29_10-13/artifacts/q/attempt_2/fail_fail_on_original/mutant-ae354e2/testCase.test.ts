import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q deprecation warning", () => {
  it("should include 'use' in the deprecation warning message", () => {
    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;

    try {
      // Trigger a deprecation warning by calling a deprecated method
      Q.allResolved([Promise.resolve(1)]);

      expect(mockWarn).toHaveBeenCalled();
      const warningMessage = mockWarn.mock.calls[0][0];
      expect(warningMessage).toContain("use");
    } finally {
      console.warn = originalWarn;
    }
  });
});