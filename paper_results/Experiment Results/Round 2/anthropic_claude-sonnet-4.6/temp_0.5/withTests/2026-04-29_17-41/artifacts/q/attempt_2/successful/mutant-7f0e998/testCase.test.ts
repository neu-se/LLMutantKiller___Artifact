import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should preserve user code frames in long stack traces", () => {
    Q.longStackSupport = true;

    try {
      function outerUserFunction(): Q.Promise<never> {
        return Q.Promise<never>(function (resolve, reject) {
          reject(new Error("boom"));
        });
      }

      return outerUserFunction().then(null, function (err: Error) {
        const stack = err.stack || "";
        // With original code: filterStackString keeps non-internal frames,
        // so "outerUserFunction" should appear in the stack.
        // With mutated code: filterStackString keeps ONLY internal Q frames,
        // so "outerUserFunction" would be stripped, leaving only Q internals
        // or an empty stack body.
        expect(stack).toContain("outerUserFunction");
      });
    } finally {
      Q.longStackSupport = false;
    }
  });
});