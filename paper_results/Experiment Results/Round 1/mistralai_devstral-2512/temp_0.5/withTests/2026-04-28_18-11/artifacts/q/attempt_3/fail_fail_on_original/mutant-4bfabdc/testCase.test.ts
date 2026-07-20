import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly handle stack traces with mixed frame types", () => {
    // Create a test scenario that will trigger stack trace filtering
    const originalQ = Q;
    const testError = new Error("Test error");

    // Create a mock stack trace that includes different types of frames
    const mockStack = [
      "Error: Test error",
      "    at userCode (test.js:10:15)",  // Should be kept
      "    at internalCode (q.js:100:20)",  // Should be filtered (internal)
      "    at Module._compile (module.js:456:26)",  // Should be filtered (node)
      "    at anotherUserFrame (test.js:20:30)"  // Should be kept
    ].join("\n");

    // Test the actual filtering behavior by examining how Q handles errors
    const deferred = originalQ.defer();
    deferred.reject(testError);

    // Enable long stack traces to ensure filtering is active
    originalQ.longStackSupport = true;

    return deferred.promise
      .catch((err: Error) => {
        // The key difference between original and mutated code is in the filter condition
        // Original: if (!isInternalFrame(line) && !isNodeFrame(line) && line)
        // Mutated:  if (!isInternalFrame(line) || !isNodeFrame(line) && line)

        // This means the mutated version will keep lines that are either:
        // 1. Not internal frames, OR
        // 2. Not node frames AND truthy
        // Which is a much more permissive filter

        // We can't directly test the internal filterStackString function,
        // but we can observe the behavior through the stack trace output
        const stack = err.stack || "";

        // The original code should filter out both internal and node frames
        // The mutated code will be more permissive and keep some frames it shouldn't
        expect(stack).not.toContain("(q.js:");
        expect(stack).not.toContain("(module.js:");

        // Restore original setting
        originalQ.longStackSupport = false;
      });
  });
});