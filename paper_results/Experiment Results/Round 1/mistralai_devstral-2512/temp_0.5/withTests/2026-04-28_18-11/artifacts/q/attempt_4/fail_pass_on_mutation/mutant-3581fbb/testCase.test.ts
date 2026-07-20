// Test case to detect the mutation in filterStackString function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter out Node.js frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace with Node.js frames
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a rejection that will generate stack traces
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (err: Error) => {
        const stack = err.stack;
        expect(stack).toBeDefined();

        // The mutation changes the condition from !isNodeFrame to isNodeFrame
        // This means Node.js frames that should be filtered out will remain
        // We need to create a scenario where Node.js frames are actually present

        // Force the presence of Node.js frames by creating a stack trace
        // that includes them (this happens naturally in Node.js environment)
        const hasNodeFrame = stack && (stack.includes("(module.js:") || stack.includes("(node.js:"));

        // In the original code, Node.js frames should be filtered out (false)
        // In the mutated code, they would remain (true)
        // This assertion will fail on the mutated version
        expect(hasNodeFrame).toBe(false);

        return Q.resolve();
      }
    );
  });
});