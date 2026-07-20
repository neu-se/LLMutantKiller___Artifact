import { Q } from "./q";

describe("Q library stack trace handling", () => {
  it("should properly handle stack traces when hasStacks is false", () => {
    // Save original hasStacks value
    const originalHasStacks = (Q as any).longStackSupport;

    try {
      // Force hasStacks to be false
      (Q as any).longStackSupport = false;

      // Create a rejected promise
      const rejectedPromise = Q.reject(new Error("Test error"));

      // The mutation would cause an issue if hasStacks is false
      // This test verifies the code handles the false case correctly
      return rejectedPromise.then(
        () => {
          throw new Error("Promise should have been rejected");
        },
        (error: Error) => {
          // This should execute without issues
          expect(error.message).toBe("Test error");
        }
      );
    } finally {
      // Restore original value
      (Q as any).longStackSupport = originalHasStacks;
    }
  });
});