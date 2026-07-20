import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter internal and node frames from stack traces", () => {
    // Access Q through the module's default export
    const Q = (qModule as any).default || qModule;

    // Create a test error with a stack trace
    const testError = new Error("Test error");

    // Create a promise chain that will generate stack traces
    const promise = Q.reject(testError);

    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    return promise
      .catch((err: Error) => {
        // The mutation changes the filter condition from AND to OR
        // Original: if (!isInternalFrame(line) && !isNodeFrame(line) && line)
        // Mutated:  if (!isInternalFrame(line) || !isNodeFrame(line) && line)

        // This means the mutated version will be more permissive and keep frames it should filter

        // We can observe this by checking if internal Q frames are properly filtered
        const stack = err.stack || "";

        // The original code should filter out internal Q frames
        // The mutated code will keep some internal frames due to the OR condition
        expect(stack).not.toContain("(q.js:");

        // Restore original setting
        Q.longStackSupport = false;
      });
  });
});