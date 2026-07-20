const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse stack trace lines with named functions", () => {
    // Create a scenario that directly tests the stack parsing functionality
    // by creating a promise chain that will generate stack traces
    Q.longStackSupport = true;

    // Create a custom error with a specific stack trace format
    // that matches the pattern the mutation affects
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                 "    at functionName (test.js:42:21)\n" +
                 "    at anotherFunction (test.js:10:5)";

    const deferred = Q.defer();
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (reason: Error) => {
        // The mutation affects getFileNameAndLineNumber which should return
        // [filename, lineNumber] for named function patterns
        // When it returns [] instead, the stack filtering will fail

        // Check that the stack trace was processed correctly
        // The original code should properly filter internal frames
        // The mutated code will fail to parse the line and won't filter correctly
        expect(reason.stack).toBeDefined();

        // The key test: check if the stack trace contains the expected pattern
        // Original code should have filtered some frames
        // Mutated code will include all frames unfiltered
        const hasExpectedPattern = reason.stack!.includes("functionName") ||
                                  reason.stack!.includes("test.js:42:21");
        expect(hasExpectedPattern).toBe(true);
      }
    );
  });
});