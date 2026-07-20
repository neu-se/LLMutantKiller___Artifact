import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should filter Q internal frames from long stack traces", () => {
    Q.longStackSupport = true;

    function userFunction() {
      return Q.reject(new Error("test error"));
    }

    return Q()
      .then(function () {
        return userFunction();
      })
      .then(
        function () {
          Q.longStackSupport = false;
          throw new Error("Should have rejected");
        },
        function (err: Error) {
          Q.longStackSupport = false;
          const stack = err.stack || "";
          // With original: Q internal frames are filtered out
          // With mutation: attempt1 regex never matches, captureLine returns undefined,
          // isInternalFrame always returns false, Q frames appear in stack
          // The "From previous event:" separator should appear in long stack traces
          expect(stack).toContain("From previous event:");
        }
      );
  });
});