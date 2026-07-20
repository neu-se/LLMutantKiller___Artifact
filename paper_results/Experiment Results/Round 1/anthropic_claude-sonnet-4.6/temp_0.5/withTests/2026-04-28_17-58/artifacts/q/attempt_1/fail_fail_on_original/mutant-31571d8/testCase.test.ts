import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with makeStackTraceLong", () => {
  it("should include stack frames from multiple levels of the promise chain when an error is rethrown", () => {
    Q.longStackSupport = true;

    function level1(): Promise<any> {
      return Q().then(function level1Handler() {
        return level2();
      });
    }

    function level2(): Promise<any> {
      return Q().then(function level2Handler() {
        return level3();
      });
    }

    function level3(): Promise<any> {
      return Q().then(function level3Handler() {
        throw new Error("test error from level3");
      });
    }

    return level1()
      .catch(function (err: any) {
        Q.longStackSupport = false;
        // With the original code, the stack trace should contain references
        // to multiple levels of the promise chain.
        // With the mutated code, __minimumStackCounter__ gets set once and
        // never updated, so only the first stack frame is included.
        const stack: string = err.stack || "";
        // The stack should contain "From previous event:" separators
        // indicating multiple promise chain frames were captured.
        const separatorCount = (stack.match(/From previous event:/g) || []).length;
        expect(separatorCount).toBeGreaterThan(1);
      });
  });
});