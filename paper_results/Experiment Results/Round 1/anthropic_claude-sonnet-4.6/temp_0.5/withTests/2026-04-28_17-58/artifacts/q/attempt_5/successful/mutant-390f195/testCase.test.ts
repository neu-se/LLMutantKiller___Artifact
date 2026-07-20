import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("does not duplicate lines when rethrowing an error - func1 appears exactly once", () => {
    Q.longStackSupport = true;

    function func3() {
      return Q.reject(new Error("test reason"));
    }

    function func2() {
      return Q.resolve(42).then(function () {
        return func3();
      });
    }

    function func1() {
      return func2()
        .catch(function (err: any) { throw err; })
        .catch(function (err: any) { throw err; });
    }

    return func1()
      .catch(function (err: any) {
        Q.longStackSupport = false;
        const stack: string = err.stack || "";
        // With original: __minimumStackCounter__ is set to p.stackCounter,
        // so on the second rethrow, stacks already included are skipped.
        // func1 should appear exactly once.
        // With mutated: __minimumStackCounter__ is always undefined,
        // so all stacks are re-traversed each time - func1 appears multiple times.
        const func1Count = (stack.match(/func1/g) || []).length;
        expect(func1Count).toBe(1);
      });
  });
});