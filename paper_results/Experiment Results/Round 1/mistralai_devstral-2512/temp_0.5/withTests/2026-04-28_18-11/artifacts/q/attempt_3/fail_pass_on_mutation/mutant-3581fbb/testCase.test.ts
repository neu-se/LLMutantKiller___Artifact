// Test case to detect the mutation in filterStackString function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly filter Node.js frames from stack traces", () => {
    // Create a scenario that will generate stack traces with Node.js frames
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a rejection
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (err: Error) => {
        const stack = err.stack;
        expect(stack).toBeDefined();

        // The mutation changes !isNodeFrame to isNodeFrame, which would incorrectly
        // keep Node.js frames in the stack trace. We need to verify this behavior
        // by checking if Node.js frames are present when they shouldn't be.

        // In the original code, Node.js frames should be filtered out
        // In the mutated code, they would remain
        const hasNodeFrame = stack && (stack.includes("(module.js:") || stack.includes("(node.js:"));

        // This assertion will pass on original code (no Node frames)
        // but fail on mutated code (Node frames present)
        expect(hasNodeFrame).toBe(false);

        return Q.resolve();
      }
    );
  });
});