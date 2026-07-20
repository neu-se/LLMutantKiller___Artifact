// testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace capture", () => {
  it("should correctly capture stack traces when hasStacks is true", () => {
    // Create a promise that will be rejected
    const promise = Q.reject(new Error("Test error"));

    // Try to get the stack trace
    promise.then(
      () => {},
      (error: Error) => {
        // Verify that a stack trace was captured
        expect(error.stack).toBeDefined();
        expect(error.stack!.length).toBeGreaterThan(0);
      }
    );

    // Since we're in a synchronous test, we need to flush the nextTick queue
    // to ensure the promise handlers are executed
    (Q as any).nextTick.flush();
  });
});