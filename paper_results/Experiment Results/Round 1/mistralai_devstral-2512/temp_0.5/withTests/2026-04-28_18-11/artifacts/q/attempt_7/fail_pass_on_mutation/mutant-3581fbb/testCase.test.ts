// Test case to detect the mutation in filterStackString function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter internal and Node.js frames from stack traces", () => {
    // Create a scenario that generates stack traces with both internal and Node.js frames
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

        // The mutation changes the condition from:
        // !isInternalFrame(line) && !isNodeFrame(line) && line
        // to:
        // !isInternalFrame(line) && isNodeFrame(line) && line
        //
        // This means Node.js frames that should be EXCLUDED will now be INCLUDED
        // while still excluding internal frames

        // Check for Node.js frame patterns
        const hasNodeFrame = stack && (stack.includes("(module.js:") || stack.includes("(node.js:"));

        // In the original code, Node.js frames should be filtered out (false)
        // In the mutated code, they would remain (true)
        expect(hasNodeFrame).toBe(false);

        // Also verify that internal Q frames are still filtered
        const hasInternalFrame = stack && stack.includes("q.js");
        expect(hasInternalFrame).toBe(false);

        return Q.resolve();
      }
    );
  });
});