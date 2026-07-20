import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should not produce an empty stack trace when long stack support is enabled and a promise is rejected", () => {
    Q.longStackSupport = true;

    function rejectingFunction() {
      const d = Q.defer();
      d.reject(new Error("test rejection"));
      return d.promise;
    }

    return rejectingFunction()
      .then(
        () => { throw new Error("Should not fulfill"); },
        (err: Error) => {
          Q.longStackSupport = false;
          // With original code: filterStackString filters internal frames but keeps
          // user frames, so stack is non-empty.
          // With mutated code: filterStackString's loop body is empty, desiredLines
          // stays [], and the function returns "", making err.stack === "".
          expect(err.stack).not.toBe("");
          expect(err.stack).toBeTruthy();
        }
      )
      .fin(() => {
        Q.longStackSupport = false;
      });
  });
});