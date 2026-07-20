const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Create a promise that will trigger stack trace parsing
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force stack trace parsing by rejecting with an error
    deferred.reject(error);

    let stackParsed = false;

    // The mutation will cause the stack trace parsing to fail
    // This test passes if no exception is thrown during parsing
    deferred.promise.then(null, (e: any) => {
      // Check if stack trace was parsed correctly
      if (e.stack && e.stack.includes("at")) {
        stackParsed = true;
      }
    });

    expect(stackParsed).toBe(true);
  });
});