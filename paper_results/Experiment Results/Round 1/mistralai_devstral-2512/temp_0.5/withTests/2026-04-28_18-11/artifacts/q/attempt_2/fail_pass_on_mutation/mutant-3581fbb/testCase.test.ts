// Test case to detect the mutation in filterStackString function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter out internal and Node.js frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a rejection that will generate stack traces
    deferred.reject(error);

    // Check the stack trace filtering behavior
    const promise = deferred.promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (err: Error) => {
        // The error should have a stack trace that excludes internal Q frames
        const stack = err.stack;
        expect(stack).toBeDefined();

        // Check that internal Q frames are filtered out
        // The mutation changes the condition from !isNodeFrame to isNodeFrame
        // which would incorrectly include Node.js frames in the filtered stack
        // This test verifies that Node.js frames are properly excluded
        const hasNodeFrame = stack && (stack.includes("(module.js:") || stack.includes("(node.js:"));
        expect(hasNodeFrame).toBe(false);

        return Q.resolve();
      }
    );

    return promise;
  });
});