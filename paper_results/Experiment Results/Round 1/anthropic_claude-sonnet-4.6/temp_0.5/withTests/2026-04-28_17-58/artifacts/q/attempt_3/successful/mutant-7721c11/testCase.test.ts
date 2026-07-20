describe("array_indexOf fallback", () => {
  it("should find elements when native indexOf is unavailable, enabling rejection untracking", (done) => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    const requirePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[requirePath];

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.indexOf = originalIndexOf;
    }

    Q.resetUnhandledRejections();

    const reason = new Error("test error");
    const p = Q.reject(reason);

    expect(Q.getUnhandledReasons().length).toBe(1);

    // Handle the rejection - this triggers untrackRejection asynchronously
    p.fail(function() { return null; });

    // Wait for async processing to complete
    setTimeout(function() {
      try {
        // With original code: array_indexOf finds the promise, splices it out -> length 0
        // With mutated code: array_indexOf always returns -1, never splices -> length 1
        expect(Q.getUnhandledReasons().length).toBe(0);
        done();
      } catch(e) {
        done(e);
      }
    }, 100);
  });
});