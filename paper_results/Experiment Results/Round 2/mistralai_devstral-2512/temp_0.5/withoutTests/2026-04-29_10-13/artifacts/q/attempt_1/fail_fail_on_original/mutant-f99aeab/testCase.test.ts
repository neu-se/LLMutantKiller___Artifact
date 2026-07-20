// testCase.test.ts
import { Q } from "./q.js";

describe("Q library stack trace capture", () => {
  it("should correctly capture stack traces when hasStacks is true", () => {
    // Force hasStacks to be true for this test
    const originalHasStacks = Q.longStackSupport;
    Q.longStackSupport = true;

    let capturedStack: string | undefined;

    try {
      // Create a promise that will be rejected
      const promise = Q.reject(new Error("Test error"));

      // Try to get the stack trace
      promise.then(
        () => {},
        (error: Error) => {
          capturedStack = error.stack;
        }
      );

      // Since we're in a synchronous test, we need to flush the nextTick queue
      // to ensure the promise handlers are executed
      (Q as any).nextTick.flush();

      // Verify that a stack trace was captured
      expect(capturedStack).toBeDefined();
      expect(capturedStack!.length).toBeGreaterThan(0);
    } finally {
      // Restore original value
      Q.longStackSupport = originalHasStacks;
    }
  });
});