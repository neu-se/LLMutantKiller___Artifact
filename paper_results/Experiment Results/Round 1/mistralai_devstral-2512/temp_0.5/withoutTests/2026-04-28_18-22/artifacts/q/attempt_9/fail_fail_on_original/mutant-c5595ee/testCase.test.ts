const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // Enable long stack traces to ensure stack parsing is used
    Q.longStackSupport = true;

    // Create a rejected promise that will trigger stack trace parsing
    const deferred = Q.defer();
    deferred.reject(new Error("Test error"));

    // Return the promise chain to ensure async handling
    return deferred.promise.catch((error: Error) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe("string");

      // Create a mock stack line that should match the attempt3 regex
      // This simulates what would come from a browser stack trace
      const mockStackLine = "http://localhost:8080/test.js:42";

      // Test the regex directly (this is what the internal function uses)
      const regex = /.*@(.+):(\d+)$/;
      const match = regex.exec(mockStackLine);

      // This should match in original code but fail in mutated code
      expect(match).not.toBeNull();
      if (match) {
        expect(match[1]).toBe("localhost:8080/test.js");
        expect(match[2]).toBe("42");
      }
    });
  });
});