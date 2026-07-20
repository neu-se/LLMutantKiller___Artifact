import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should not duplicate lines when rethrowing an error - stack must contain all function names in order", (done) => {
    (Q as any).longStackSupport = true;

    function func1() {
      return func2()
        .fail(function rethrow1(err: any) { throw err; })
        .fail(function rethrow2(err: any) { throw err; });
    }
    function func2() {
      return (Q as any)().then(function() {
        return func3();
      });
    }
    function func3() {
      return (Q as any).reject(new Error("REASON"));
    }

    func1().fail(function(err: any) {
      try {
        // In the original code, the `> p.stackCounter` condition allows
        // the stack trace to accumulate frames from func3 through func2 through func1.
        // In the mutated code, `false` prevents adding stacks after the first one,
        // so the chain func3->func2->func1 is broken.
        expect(err.stack).toMatch(/func3[\s\S]*func2[\s\S]*func1/);
        (Q as any).longStackSupport = false;
        done();
      } catch(e) {
        (Q as any).longStackSupport = false;
        done(e);
      }
    });
  });
});