import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior in long stack traces", () => {
  it("should include user code frames in long stack traces, not just internal Q frames", (done) => {
    Q.longStackSupport = true;

    function userDefinedFunction() {
      return Q.reject(new Error("test error from userDefinedFunction"));
    }

    userDefinedFunction().fail(function (err: any) {
      Q.longStackSupport = false;
      // The stack trace should contain the user function name
      // In the original code: non-internal frames are kept, so "userDefinedFunction" appears
      // In the mutated code: only internal frames are kept, so "userDefinedFunction" would NOT appear
      expect(err.stack).toContain("userDefinedFunction");
      done();
    });
  });
});