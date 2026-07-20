import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should preserve non-internal frames in long stack traces so the stack is non-empty", (done) => {
    Q.longStackSupport = true;

    function outerFunction() {
      return Q().then(function innerFunction() {
        throw new Error("boom");
      });
    }

    outerFunction().then(null, function (err: any) {
      Q.longStackSupport = false;
      // With original code: non-internal frames are kept, stack has content from user code
      // With mutated code: only internal Q frames are kept, user frames are removed,
      // leaving the stack essentially empty or without user-visible lines
      const stackLines = (err.stack as string)
        .split("\n")
        .filter((line: string) => line.trim().length > 0);
      expect(stackLines.length).toBeGreaterThan(0);
      // The filtered stack should contain something meaningful (not just the error message line)
      const frameLines = stackLines.filter((line: string) => line.trim().startsWith("at "));
      expect(frameLines.length).toBeGreaterThan(0);
      done();
    });
  });
});