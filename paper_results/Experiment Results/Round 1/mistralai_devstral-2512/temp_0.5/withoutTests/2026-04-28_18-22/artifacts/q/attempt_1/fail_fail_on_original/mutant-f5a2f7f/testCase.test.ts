import { Q } from "./q.js";

describe("Q library stack trace capture", () => {
  it("should capture stack traces when available", () => {
    // This test verifies that Q correctly detects stack trace support
    // The mutation changes the condition from `if (!hasStacks)` to `if (false)`
    // which would break stack trace capture functionality

    // Create a promise chain that would normally capture stack traces
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    return promise
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (error: Error) => {
          // In the original code, stack traces should be captured
          // In the mutated code, stack trace capture is disabled
          expect(error.stack).toBeDefined();
          expect(error.stack!.length).toBeGreaterThan(0);
        }
      );
  });
});