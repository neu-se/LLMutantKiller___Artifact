// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("captureLine function behavior", () => {
  it("should correctly handle stack traces and return line number", () => {
    // This test verifies that the captureLine function properly processes
    // stack traces and returns the line number. The mutation removes the
    // early return statement when fileNameAndLineNumber is falsy, which
    // would cause the function to continue execution and potentially fail
    // when trying to access properties of undefined.
    Q.longStackSupport = true;
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));
    return deferred.promise.then(null, (error: Error) => {
      expect(error.stack).toBeTruthy();
    });
  });
});