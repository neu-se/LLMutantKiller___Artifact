const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter internal frames from stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise rejection with a unique error message
    const uniqueError = new Error("UNIQUE_TEST_ERROR_12345");
    const promise = Q.reject(uniqueError);

    try {
      await promise;
    } catch (error: any) {
      const stack = error.stack;
      // The original code should filter internal frames, resulting in a shorter stack
      // The mutated code with "if (true)" will include all frames making it longer
      // We check for specific internal function names that should be filtered
      const internalFunctions = [
        "filterStackString",
        "isInternalFrame",
        "getFileNameAndLineNumber",
        "makeStackTraceLong"
      ];

      const foundInternalFunctions = internalFunctions.filter(func =>
        stack.includes(`at ${func}`)
      );

      expect(foundInternalFunctions.length).toBe(0);
    }
  });
});