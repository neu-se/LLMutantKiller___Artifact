import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should correctly handle stack traces with both internal and node frames", () => {
    // Enable long stack traces to trigger the filtering logic
    Q.longStackSupport = true;

    // Create a chain of promises that will generate a stack trace
    const testPromise = Q.Promise((resolve: any, reject: any) => {
      setTimeout(() => {
        const error = new Error("Test error");
        // Create a stack trace that includes both internal and node frames
        error.stack = [
          "Error: Test error",
          "    at /test/file.js:10:5", // Regular frame - should be kept
          "    at q.js:123:4", // Internal frame - should be filtered
          "    at Module._compile (module.js:456:26)", // Node frame - should be filtered
          "    at /test/file.js:20:7" // Regular frame - should be kept
        ].join("\n");
        reject(error);
      }, 0);
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
        expect(filteredStack).toContain("/test/file.js:20:7");
      }
    );
  });
});