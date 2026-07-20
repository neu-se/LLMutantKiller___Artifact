const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Create a deferred promise
    const deferred = Q.defer();

    // Create an error with a specific stack trace format
    const error = new Error();
    error.stack = "Error\n    at functionName (filename.js:42:21)";

    // Reject the promise with the error
    deferred.reject(error);

    // Handle the rejection to trigger stack trace parsing
    let parsedStack = false;
    deferred.promise.then(null, (e: any) => {
      // Check if the stack trace was parsed correctly
      if (e.stack && e.stack.includes("at functionName (filename.js:42:21)")) {
        parsedStack = true;
      }
    });

    // The mutation will prevent proper stack trace parsing
    expect(parsedStack).toBe(true);
  });
});