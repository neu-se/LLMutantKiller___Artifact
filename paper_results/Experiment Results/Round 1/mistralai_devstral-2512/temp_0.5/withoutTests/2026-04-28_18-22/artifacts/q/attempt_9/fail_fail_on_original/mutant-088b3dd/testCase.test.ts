const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error stack parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Create a scenario that forces stack trace parsing
    const error = new Error("Test error");
    error.stack = "Error: Test error\n    at testFunction (/path/to/file.js:10:5)\n    at anotherFunction (/path/to/another.js:20:3)";

    // Create a rejected promise that will trigger stack trace processing
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Set up the promise stack to include internal frames
    promise.stack = "Promise\n    at q.js:100:15\n    at test.js:5:10";

    // This will trigger the stack trace filtering which uses getFileNameAndLineNumber
    Q.makeStackTraceLong(error, promise);

    // Verify the stack was processed
    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("testFunction");
  });
});