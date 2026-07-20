import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces include calling functions when attempt1 regex is used", () => {
  it("should correctly format long stack traces with named function frames", (done) => {
    Q.longStackSupport = true;

    function outerFunction() {
      return Q().then(function () {
        return innerFunction();
      });
    }

    function innerFunction() {
      return Q.reject(new Error("test error"));
    }

    outerFunction().catch(function (err: Error) {
      // With the original code, Q's internal frames are filtered out,
      // so the stack should contain user function names but not Q internals.
      // With the mutation, getFileNameAndLineNumber fails for named function frames,
      // so captureLine returns undefined, and isInternalFrame never filters Q frames,
      // causing Q internals to appear in the stack trace.
      const stack = err.stack || "";
      
      // The stack should contain our user-defined function names
      expect(stack).toMatch(/outerFunction|innerFunction/);
      
      // With the original code, Q internal frames are filtered.
      // With the mutation, captureLine fails (returns undefined for named frames),
      // so qStartingLine is undefined, and Q frames are NOT filtered.
      // We verify the stack does NOT contain Q's internal implementation details
      // by checking that "promiseDispatch" (a Q internal) is absent.
      expect(stack).not.toMatch(/promiseDispatch/);
      
      Q.longStackSupport = false;
      done();
    });
  });
});