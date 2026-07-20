import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should correctly filter stack traces with node frames", () => {
    // Create a test scenario that will trigger stack trace filtering
    const testPromise = Q.Promise((resolve: any, reject: any) => {
      // Create an error with a stack trace that includes node frames
      const error = new Error("Test error");
      error.stack = [
        "Error: Test error",
        "    at /test/file.js:10:5", // Regular frame - should be kept
        "    at Module._compile (module.js:456:26)", // Node frame - should be filtered
        "    at /test/file.js:20:7" // Regular frame - should be kept
      ].join("\n");

      reject(error);
    });

    return testPromise.then(
      () => {
        throw new Error("Should have been rejected");
      },
      (error: Error) => {
        // The stack should be filtered to remove node frames
        const filteredStack = error.stack;

        // Check that node frames (module.js) are removed
        expect(filteredStack).not.toContain("module.js");

        // Check that regular frames are preserved
        expect(filteredStack).toContain("/test/file.js:10:5");
        expect(filteredStack).toContain("/test/file.js:20:7");
      }
    );
  });
});