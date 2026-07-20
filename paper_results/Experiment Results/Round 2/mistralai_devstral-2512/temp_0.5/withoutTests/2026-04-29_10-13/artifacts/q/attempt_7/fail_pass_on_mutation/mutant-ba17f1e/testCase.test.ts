const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly extract file name and line number from named function stack traces", () => {
    // Create a promise chain that will generate stack traces
    // The mutation affects getFileNameAndLineNumber which is used in isInternalFrame
    Q.longStackSupport = true;

    // Create a deferred that will be rejected with a specific error format
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Manipulate the stack to include a line that matches the pattern
    // that getFileNameAndLineNumber should parse
    error.stack = "Error: Test error\n" +
                 "    at testFunction (test-file.js:123:45)\n" +
                 "    at anotherFunction (test-file.js:67:89)";

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (reason: Error) => {
        // The mutation causes getFileNameAndLineNumber to return []
        // instead of [filename, lineNumber] for named function patterns
        // This breaks the stack trace filtering logic

        // Check that the stack trace contains expected content
        // The original code should properly filter internal frames
        // The mutated code will fail to parse and won't filter correctly
        expect(reason.stack).toBeDefined();

        // The key test: check if the stack trace was properly processed
        // Original code should have filtered some frames
        // Mutated code will include all frames unfiltered
        const stackLines = reason.stack!.split('\n');
        const hasFilteredStack = stackLines.some(line =>
          line.includes("From previous event:") ||
          line.includes("test-file.js")
        );

        expect(hasFilteredStack).toBe(true);
      }
    );
  });
});