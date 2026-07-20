import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering", () => {
  it("should not filter out all frames from error stack traces with long stack support", (done) => {
    Q.longStackSupport = true;

    function userDefinedFunction() {
      const deferred = Q.defer();
      deferred.reject(new Error("test rejection"));
      return deferred.promise;
    }

    userDefinedFunction().then(null, function rejectionHandler(err: Error) {
      Q.longStackSupport = false;
      // With the original code, isInternalFrame only filters Q-internal frames,
      // so the error stack should still contain content from user frames.
      // With the mutation, isInternalFrame always returns true, so filterStackString
      // removes ALL lines, leaving an empty string.
      const stack = err.stack || "";
      try {
        expect(stack).not.toBe("");
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});