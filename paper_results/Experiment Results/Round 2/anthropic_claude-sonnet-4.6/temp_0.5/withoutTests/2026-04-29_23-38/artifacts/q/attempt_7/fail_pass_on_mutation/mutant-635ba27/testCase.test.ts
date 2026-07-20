describe("array_indexOf shim", () => {
  it("should find elements correctly when native indexOf is unavailable at module load", (done) => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    jest.resetModules();
    jest.isolateModules(() => {
      let Q: any;
      try {
        Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      } finally {
        Array.prototype.indexOf = originalIndexOf;
      }

      const err = new Error("test");
      const rejected = Q.reject(err);

      // When we handle the rejection, untrackRejection uses array_indexOf
      // With i-- mutation: infinite loop, done() never called, test times out
      // With i++ original: completes normally, done() called
      rejected.then(null, () => {
        done();
      });
    });
  }, 5000);
});