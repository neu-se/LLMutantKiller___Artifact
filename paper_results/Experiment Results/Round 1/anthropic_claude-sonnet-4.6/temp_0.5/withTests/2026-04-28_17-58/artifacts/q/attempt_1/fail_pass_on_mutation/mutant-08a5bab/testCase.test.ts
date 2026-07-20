import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("should include user function names in long stack traces, not filter them out", (done) => {
    Q.longStackSupport = true;

    function userFunc3() {
      return Q.reject(new Error("test error from userFunc3"));
    }

    function userFunc2() {
      return userFunc3();
    }

    function userFunc1() {
      return userFunc2();
    }

    userFunc1().fail(function (err: Error) {
      Q.longStackSupport = false;
      // The stack should contain user function names since they are NOT internal Q frames
      // With the mutation, isInternalFrame returns true for ALL frames,
      // causing all frames to be filtered out, leaving an empty or minimal stack
      expect(err.stack).toMatch(/userFunc3/);
      done();
    });
  });
});