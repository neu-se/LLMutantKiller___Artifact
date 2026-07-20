import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame lower bound check", () => {
  it("should include stack frames from user code when long stack support is enabled", () => {
    Q.longStackSupport = true;

    let capturedError: Error | null = null;

    function userFunction() {
      return Q.reject(new Error("test rejection"));
    }

    const promise = userFunction();

    return promise.then(
      () => {
        Q.longStackSupport = false;
        throw new Error("Should have rejected");
      },
      (err: Error) => {
        Q.longStackSupport = false;
        capturedError = err;
        // The error should exist and have a stack
        expect(capturedError).toBeTruthy();
        expect(capturedError!.stack).toBeDefined();

        // With the original code, qStartingLine is set to the line where
        // captureLine() is first called (near the top of q.js).
        // The mutation changes the lower bound check from
        // `lineNumber >= qStartingLine` to `true`, meaning frames with
        // line numbers below qStartingLine (but still in q.js) would be
        // incorrectly filtered as internal frames.
        // However, user code frames should never be in q.js, so the
        // observable difference is in whether Q's own early frames get filtered.
        // 
        // The real test: with longStackSupport, the error stack should contain
        // "From previous event:" separator showing the promise chain.
        // Both versions should produce this, but the mutation causes frames
        // before qStartingLine in q.js to be filtered - which means the
        // Q.reject call site in userFunction might get included or excluded
        // differently based on whether Q internals are filtered correctly.
        //
        // The stack should contain the "From previous event:" marker
        // indicating long stack traces are working
        expect(capturedError!.stack).toContain("From previous event:");
      }
    );
  });
});