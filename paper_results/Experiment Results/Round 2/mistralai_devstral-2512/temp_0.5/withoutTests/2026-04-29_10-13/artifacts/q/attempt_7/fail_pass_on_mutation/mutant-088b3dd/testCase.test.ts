const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", async () => {
    // Create a promise that will trigger stack trace parsing
    const deferred = Q.defer();
    const error = new Error("Test error at functionName (test.js:42:21)");

    // Force stack trace parsing by rejecting with an error
    deferred.reject(error);

    let result;
    await deferred.promise.then(null, (e: any) => {
      result = e;
    });

    // The mutation will cause the stack trace parsing to fail
    // This test checks if the stack trace was parsed correctly
    expect(result?.stack).toContain("at functionName (test.js:42:21)");
  });
});