import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should correctly filter stack traces based on internal and node frames", () => {
    // Create a mock stack trace that includes internal frames, node frames, and regular frames
    const mockStack = [
      "Error: Test error",
      "    at Object.<anonymous> (/test/file.js:10:5)", // Regular frame
      "    at Module._compile (module.js:456:26)", // Node frame
      "    at Object.Module._extensions..js (module.js:474:10)", // Node frame
      "    at Module.load (module.js:356:32)", // Node frame
      "    at Function.Module._load (module.js:312:12)", // Node frame
      "    at Function.Module.runMain (module.js:497:10)", // Node frame
      "    at startup (node.js:119:16)", // Node frame
      "    at /test/file.js:15:3", // Regular frame
      "    at q.js:123:4", // Internal frame (assuming q.js is the file)
      "    at /test/file.js:20:7" // Regular frame
    ].join("\n");

    // Create a promise that will be rejected with this stack trace
    const deferred = Q.defer();
    const error = new Error("Test error");
    error.stack = mockStack;

    // Reject the promise with the error
    deferred.reject(error);

    // Handle the rejection and check the filtered stack
    return deferred.promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (rejectedError) => {
        // The stack should be filtered to remove internal and node frames
        const filteredStack = rejectedError.stack;

        // Check that internal frames (q.js) are removed
        expect(filteredStack).not.toContain("q.js:123:4");

        // Check that node frames (module.js, node.js) are removed
        expect(filteredStack).not.toContain("module.js");
        expect(filteredStack).not.toContain("node.js");

        // Check that regular frames are preserved
        expect(filteredStack).toContain("/test/file.js:10:5");
        expect(filteredStack).toContain("/test/file.js:15:3");
        expect(filteredStack).toContain("/test/file.js:20:7");
      }
    );
  });
});