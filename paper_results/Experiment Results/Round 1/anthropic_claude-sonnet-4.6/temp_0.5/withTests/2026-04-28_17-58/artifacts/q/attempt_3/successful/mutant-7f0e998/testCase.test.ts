import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("filtered long stack trace should contain the error message line", (done) => {
    Q.longStackSupport = true;

    Q().then(function () {
      throw new Error("sentinel_error_xyz");
    }).then(null, function (err: any) {
      Q.longStackSupport = false;
      const stack: string = err.stack || "";
      // Original: non-internal frames kept, error message + user frames present
      // Mutated: only internal Q frames kept; the first line (error message) 
      // is also a non-internal frame so it gets filtered out too,
      // resulting in a stack that does NOT contain the error message
      expect(stack).toContain("sentinel_error_xyz");
      done();
    });
  });
});