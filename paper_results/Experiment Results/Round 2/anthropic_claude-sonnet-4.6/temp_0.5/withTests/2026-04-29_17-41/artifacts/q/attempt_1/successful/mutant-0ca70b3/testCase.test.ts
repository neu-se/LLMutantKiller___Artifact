import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString in long stack traces", () => {
  it("should preserve stack trace lines when long stack support is enabled", () => {
    Q.longStackSupport = true;

    return Q()
      .then(function outerFunction() {
        return Q.reject(new Error("test error"));
      })
      .catch(function(err: Error) {
        Q.longStackSupport = false;
        // With the original code, the stack should contain meaningful content
        // With the mutated code, filterStackString returns "" because the loop
        // condition `i >= lines.length` is false from the start (i=0, length>0)
        // so no lines are ever added to desiredLines, resulting in an empty string
        expect(err.stack).toBeTruthy();
        expect(err.stack!.length).toBeGreaterThan(0);
        // The stack should contain the error message or function references
        expect(err.stack).toContain("test error");
      })
      .finally(() => {
        Q.longStackSupport = false;
      });
  });
});