import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter frames that are both internal and node frames", () => {
    // Access Q through the module's default export
    const Q = (qModule as any).default || qModule;

    // Create a mock error with a stack trace that has frames that would be
    // considered both internal and node frames (edge case)
    const testError = new Error("Test error");
    testError.stack = [
      "Error: Test error",
      "    at userCode (test.js:10:15)",
      "    at qInternal (q.js:100:20)",  // Internal Q frame
      "    at Module._compile (module.js:456:26)",  // Node frame
      "    at moreUserCode (test.js:20:30)"
    ].join("\n");

    // Create a promise that will trigger stack trace processing
    const deferred = Q.defer();
    deferred.reject(testError);

    // Enable long stack traces
    Q.longStackSupport = true;

    return deferred.promise
      .catch((err: Error) => {
        const stack = err.stack || "";
        const lines = stack.split('\n');

        // Count how many lines remain after filtering
        let nonErrorLines = 0;
        for (const line of lines) {
          if (line && !line.startsWith('Error:')) {
            nonErrorLines++;
          }
        }

        // Original code (AND condition): Should filter out both internal and node frames
        // Mutated code (OR condition): Will be more permissive and keep some frames
        // The original should keep only user frames (2 lines)
        // The mutated will keep more lines due to the OR logic
        expect(nonErrorLines).toBe(2);

        // Restore original setting
        Q.longStackSupport = false;
      });
  });
});