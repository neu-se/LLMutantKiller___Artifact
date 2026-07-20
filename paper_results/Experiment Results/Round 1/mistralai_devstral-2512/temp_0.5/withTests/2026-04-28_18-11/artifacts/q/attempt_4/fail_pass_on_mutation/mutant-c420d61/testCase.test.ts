// Test case to detect the mutation in the isNodeFrame function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly filter Node.js stack frames", () => {
    // Enable long stack traces to ensure stack filtering is active
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack frames
    const deferred = Q.defer();
    const error = new Error("Test error with node.js frame");

    // Create a stack frame that should be filtered
    Q.nextTick(() => {
      deferred.reject(error);
    });

    return deferred.promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (e: Error) => {
        // Check if the stack contains Node.js internal frames
        const stackLines = e.stack?.split('\n') || [];
        const nodeFrameCount = stackLines.filter((line: string) =>
          line.includes("(node.js:") || line.includes("at Module.")
        ).length;

        // In the original code, Node.js frames should be filtered out (count should be 0)
        // In the mutated code, the function always returns false, so filtering won't work
        // This means Node.js frames would remain in the stack (count > 0)
        expect(nodeFrameCount).toBe(0);
      }
    );
  });
});