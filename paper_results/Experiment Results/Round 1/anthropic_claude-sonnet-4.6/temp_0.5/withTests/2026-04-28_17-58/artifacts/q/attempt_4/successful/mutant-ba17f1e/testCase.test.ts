import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack traces frame filtering", () => {
  it("should correctly identify and filter internal Q frames using filename and line number", () => {
    Q.longStackSupport = true;

    // captureLine() is called at module load time with a stack frame like:
    // "at captureLine (q.js:123:5)" - matches attempt1 regex
    // Original: returns [filename, lineNumber] correctly
    // Mutated: returns [] so fileName=undefined, lineNumber=undefined
    // This means isInternalFrame always returns false
    // So Q frames appear in filtered stacks

    function throwingFunction() {
      return Q.reject(new Error("rejection"));
    }

    return Q()
      .then(function () {
        return throwingFunction();
      })
      .then(
        function () {
          Q.longStackSupport = false;
          throw new Error("expected rejection");
        },
        function (err: Error) {
          Q.longStackSupport = false;
          const stack = err.stack || "";
          // In original: Q frames filtered, stack is shorter/cleaner
          // In mutated: Q frames NOT filtered, "runSingle" or "flush" appear
          expect(stack).not.toMatch(/\brunSingle\b/);
        }
      );
  });
});