import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q filters anonymous frames", () => {
  it("filters anonymous Q.js frames with multi-digit line numbers", async () => {
    Q.longStackSupport = true;

    try {
      // Get the absolute path to Q.js
      const qFilePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // Create an error with an anonymous Q.js frame at line 500
      const targetLine = 500;
      const customError = new Error("test");
      customError.stack = [
        "Error: test",
        `    at ${qFilePath}:${targetLine}:5`,
        "    at Object.<anonymous> (usercode.js:1:1)"
      ].join("\n");

      let capturedError: Error | null = null;
      const deferred = Q.defer();
      const p = deferred.promise.then(null, (e: Error) => {
        capturedError = e;
      });
      deferred.reject(customError);
      await p;

      expect(capturedError).not.toBeNull();
      const resultStack = capturedError!.stack || "";

      // Original (\d+): attempt2 matches, isInternalFrame=true -> filtered
      // Mutated (\d):   attempt2 fails, isInternalFrame=false -> kept
      expect(resultStack).not.toContain(`${qFilePath}:${targetLine}:`);
    } finally {
      Q.longStackSupport = false;
    }
  });
});