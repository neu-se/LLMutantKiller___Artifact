import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with getFileNameAndLineNumber", () => {
  it("should include calling function names in long stack traces when using named function format", () => {
    Q.longStackSupport = true;

    function outerFunction() {
      return Q().then(function () {
        return innerFunction();
      });
    }

    function innerFunction() {
      return Q.reject(new Error("test error"));
    }

    return outerFunction().catch(function (err: any) {
      Q.longStackSupport = false;
      // With the original code, Q's internal frames are filtered out,
      // so the stack should contain user function names.
      // With the mutated code, getFileNameAndLineNumber returns [] for named
      // function format, so captureLine returns undefined, qFileName is undefined,
      // and isInternalFrame never matches Q's frames - they won't be filtered.
      // The stack trace should contain "outerFunction" and "innerFunction"
      // in both cases, but the presence/absence of Q internal frames differs.
      // More specifically, with the mutation, captureLine() returns undefined
      // for qStartingLine, so qEndingLine is also undefined, and isInternalFrame
      // always returns false - Q frames are NOT filtered.
      // The stack should contain the user function names regardless.
      expect(err.stack).toContain("outerFunction");
    }).then(() => {
      Q.longStackSupport = false;
    }, (e: any) => {
      Q.longStackSupport = false;
      throw e;
    });
  });
});