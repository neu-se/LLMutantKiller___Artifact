import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("does not duplicate lines when rethrowing an error", () => {
    Q.longStackSupport = true;

    function func3() {
      return Q.reject(new Error("test error"));
    }

    function func2() {
      return Q.resolve(1).then(function innerFunc2() {
        return func3();
      });
    }

    function func1() {
      return func2()
        .catch(function rethrowA(err: any) { throw err; })
        .catch(function rethrowB(err: any) { throw err; });
    }

    return func1()
      .catch(function (err: any) {
        Q.longStackSupport = false;
        const stack: string = err.stack || "";
        // With the mutation, __minimumStackCounter__ is never set properly,
        // so the same stack frames get appended multiple times.
        // With the original code, func2 should appear only once.
        const func2Count = (stack.match(/innerFunc2/g) || []).length;
        expect(func2Count).toBe(1);
      })
      .then(() => {
        Q.longStackSupport = false;
      });
  });
});