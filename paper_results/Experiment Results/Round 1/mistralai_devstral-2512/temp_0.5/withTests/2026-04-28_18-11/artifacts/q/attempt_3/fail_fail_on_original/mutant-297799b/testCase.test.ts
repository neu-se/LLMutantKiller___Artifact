// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly identify and filter internal stack frames", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal stack frames
    const error = new Error("Test error");
    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (e: any) => {
        // Check if the stack trace contains internal Q frames
        const stackLines = e.stack.split('\n');
        const hasQInternalFrames = stackLines.some((line: string) =>
          line.includes("(q.js:") && line.includes("promiseDispatch")
        );

        // In the original code, internal Q frames should be filtered out
        // In the mutated code (return true), they won't be filtered
        expect(hasQInternalFrames).toBe(false);
        return Q.resolve();
      }
    );
  });
});