const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", () => {
    // Create a promise that will generate a stack trace with internal frames
    const promise = Q.reject(new Error("Test error"));

    // Enable long stack traces to ensure internal frames are present
    Q.longStackSupport = true;

    return promise.catch((error: Error) => {
      const stack = error.stack || "";
      const lines = stack.split("\n");

      // Check for specific internal Q function names that should be filtered
      const hasInternalQFrames = lines.some(line =>
        line.includes("q.js") &&
        (line.includes("makeStackTraceLong") ||
         line.includes("filterStackString") ||
         line.includes("captureLine"))
      );

      // Original code should filter these internal frames (false)
      // Mutated code (i >= lines.length) won't execute the loop, leaving them visible (true)
      expect(hasInternalQFrames).toBe(false);
    });
  });
});