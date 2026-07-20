import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering behavior", () => {
  it("should correctly filter stack traces with node frames", () => {
    // Access Q through the module's default export
    const Q = (qModule as any).default || qModule;

    // Create a test error with a stack trace that includes node frames
    const testError = new Error("Test error");
    testError.stack = [
      "Error: Test error",
      "    at userCode (test.js:10:15)",
      "    at Module._compile (module.js:456:26)",  // Node frame
      "    at Object.Module._extensions..js (module.js:474:10)",  // Node frame
      "    at anotherUserFrame (test.js:20:30)"
    ].join("\n");

    // Create a promise that will use the stack trace filtering
    const deferred = Q.defer();
    deferred.reject(testError);

    // Enable long stack traces
    Q.longStackSupport = true;

    return deferred.promise
      .catch((err: Error) => {
        const stack = err.stack || "";

        // The original code should filter out node frames (module.js lines)
        // The mutated code with OR condition will keep node frames
        // because !isInternalFrame(line) will be true for node frames
        expect(stack).not.toContain("(module.js:");

        // Restore original setting
        Q.longStackSupport = false;
      });
  });
});