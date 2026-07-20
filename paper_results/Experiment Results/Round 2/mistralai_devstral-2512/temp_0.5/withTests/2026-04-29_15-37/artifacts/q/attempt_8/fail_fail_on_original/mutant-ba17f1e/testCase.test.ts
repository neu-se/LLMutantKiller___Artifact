const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a deferred promise to capture stack traces
    const deferred = Q.defer();

    // Force stack trace capture by throwing an error in a promise
    Q().then(() => {
      throw new Error("Test error");
    }).catch((error) => {
      // The error should have a properly formatted stack trace
      expect(error.stack).toBeDefined();

      // Parse the first stack line to test getFileNameAndLineNumber
      const stackLines = error.stack.split('\n');
      const firstStackLine = stackLines.find(line =>
        line.includes('at ') && line.includes('.js:')
      );

      if (firstStackLine) {
        // This will fail on mutated code because getFileNameAndLineNumber returns []
        const result = Q._getFileNameAndLineNumber(firstStackLine);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(typeof result[0]).toBe('string');
        expect(typeof result[1]).toBe('number');
      }
    });

    return deferred.promise;
  });
});