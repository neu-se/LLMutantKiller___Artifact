import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces deduplication", () => {
  it("does not duplicate stack frames when an error is rethrown through multiple catch handlers", () => {
    Q.longStackSupport = true;

    function func3() {
      return Q.reject(new Error("test error"));
    }

    function func2() {
      return Q().then(function () {
        return func3();
      });
    }

    function func1() {
      return func2()
        .catch(function rethrow1(err) { throw err; })
        .catch(function rethrow2(err) { throw err; });
    }

    return func1().catch(function (err: Error) {
      Q.longStackSupport = false;
      // With the original code, __minimumStackCounter__ is set properly,
      // so func1 appears only once in the stack trace.
      // With the mutated code, __minimumStackCounter__ is always undefined,
      // so the deduplication check always passes, causing func1 to appear multiple times.
      const func1Matches = (err.stack || "").match(/func1/g);
      expect(func1Matches).not.toBeNull();
      expect(func1Matches!.length).toBe(1);
    }).then(() => {
      Q.longStackSupport = false;
    }, (err: Error) => {
      Q.longStackSupport = false;
      throw err;
    });
  });
});