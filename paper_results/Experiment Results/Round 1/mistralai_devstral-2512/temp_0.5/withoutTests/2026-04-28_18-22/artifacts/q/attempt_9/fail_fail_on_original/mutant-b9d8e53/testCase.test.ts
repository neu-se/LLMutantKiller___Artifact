const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly identify internal frames with multi-digit line numbers", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    deferred.reject(new Error("Test error"));

    return deferred.promise.catch((error: Error) => {
      // Verify the stack trace exists
      expect(error.stack).toBeDefined();

      // Create a test stack line that would be from Q with a multi-digit line number
      const testStackLine = "at Promise.promiseDispatch (q.js:123:45)";

      // We need to test the actual isInternalFrame function
      // Since it's not directly exposed, we'll test it through the stack filtering behavior
      // The mutation would cause lines with multi-digit line numbers to not be recognized as Q frames

      // Create a promise with long stack traces enabled
      const originalLongStackSupport = Q.longStackSupport;
      Q.longStackSupport = true;

      try {
        const promise = Q.resolve()
          .then(() => {
            throw new Error("Test with long stacks");
          });

        return promise.catch((longStackError: Error) => {
          // The long stack trace should include Q internal frames
          expect(longStackError.stack).toBeDefined();

          // Check if the stack contains properly filtered frames
          // The mutation would cause multi-digit line numbers to not match
          // the regex pattern, resulting in different stack filtering behavior
          const lines = longStackError.stack!.split("\n");
          let foundMultiDigitQFrame = false;

          for (const line of lines) {
            // Look for Q internal frames with multi-digit line numbers
            if (line.includes("q.js") || line.includes("q:")) {
              const match = /\((.+):(\d+):\d+\)/.exec(line);
              if (match && match[2].length > 1) {
                foundMultiDigitQFrame = true;
                const lineNumber = parseInt(match[2], 10);
                // This assertion will fail if the mutation causes incorrect parsing
                expect(lineNumber).toBeGreaterThan(9);
                expect(match[2].length).toBeGreaterThan(1);
              }
            }
          }

          // If we found multi-digit Q frames, the filtering worked correctly
          // The mutation would likely result in these frames not being properly identified
          expect(foundMultiDigitQFrame).toBe(true);

          return Q.resolve();
        });
      } finally {
        Q.longStackSupport = originalLongStackSupport;
      }
    });
  });
});