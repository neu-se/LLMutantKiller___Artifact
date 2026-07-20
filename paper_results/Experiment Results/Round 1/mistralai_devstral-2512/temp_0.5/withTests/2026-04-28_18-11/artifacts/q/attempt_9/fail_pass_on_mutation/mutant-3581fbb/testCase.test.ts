// Test case to detect the mutation in filterStackString function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should filter out Node.js frames from stack traces", () => {
    // Create a promise rejection that will generate stack traces
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

        // The mutation changes the condition from:
        // !isInternalFrame(line) && !isNodeFrame(line) && line
        // to:
        // !isInternalFrame(line) && isNodeFrame(line) && line
        //
        // This means Node.js frames that should be filtered out will now be included
        // We need to verify this by checking if Node.js frames appear in the stack

        // Check for Node.js frame patterns
        const hasNodeFrame = stack && (stack.includes("(module.js:") || stack.includes("(node.js:"));

        // In the original code, Node.js frames should be filtered out (false)
        // In the mutated code, they would remain (true)
        // This assertion will fail on the mutated version
        expect(hasNodeFrame).toBe(false);

        // Also verify that the stack contains some frames (not completely empty)
        expect(stack.split('\n').length).toBeGreaterThan(1);

        return Q.resolve();
      }
    );
  });
});