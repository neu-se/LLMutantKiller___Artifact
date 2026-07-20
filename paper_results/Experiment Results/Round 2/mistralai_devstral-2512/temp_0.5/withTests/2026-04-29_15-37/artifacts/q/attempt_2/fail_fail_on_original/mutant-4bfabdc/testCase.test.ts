import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should correctly filter stack traces with mixed frame types", () => {
    // Create a test scenario that will trigger stack trace filtering
    const testPromise = Q.Promise(function(resolve, reject) {
      // Create an error with a stack trace that includes internal, node, and regular frames
      const error = new Error("Test error");
      error.stack = [
        "Error: Test error",
        "    at /test/file.js:10:5", // Regular frame - should be kept
        "    at Module._compile (module.js:456:26)", // Node frame - should be filtered
        "    at /test/file.js:15:3", // Regular frame - should be kept
        "    at q.js:123:4", // Internal frame - should be filtered
        "    at /test/file.js:20:7" // Regular frame - should be kept
      ].join("\n");

      reject(error);
    });

    return testPromise.then(
      () => {
        throw new Error("Should have been rejected");
      },
      (error: Error) => {
        // The stack should be filtered to remove internal and node frames
        const filteredStack = error.stack;

        // Check that internal frames (q.js) are removed
        expect(filteredStack).not.toContain("q.js:123:4");

        // Check that node frames (module.js) are removed
        expect(filteredStack).not.toContain("module.js");

        // Check that regular frames are preserved
        expect(filteredStack).toContain("/test/file.js:10:5");
        expect(filteredStack).toContain("/test/file.js:15:3");
        expect(filteredStack).toContain("/test/file.js:20:7");
      }
    );
  });
});