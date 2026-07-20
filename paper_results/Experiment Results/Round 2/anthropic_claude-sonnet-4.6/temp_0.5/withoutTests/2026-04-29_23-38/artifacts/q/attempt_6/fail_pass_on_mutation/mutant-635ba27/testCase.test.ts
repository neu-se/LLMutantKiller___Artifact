describe("array_indexOf shim forward iteration", () => {
  it("should complete rejection handling without infinite loop when indexOf shim is used", (done) => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore  
    delete Array.prototype.indexOf;

    jest.resetModules();

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.indexOf = originalIndexOf;
    }

    // Create a rejection - this adds to unhandledRejections via trackRejection
    const rejected = Q.reject(new Error("test error"));

    // Handle it - this triggers untrackRejection which calls array_indexOf
    // With i--, this would infinite loop and never call done()
    Q.when(rejected, 
      () => done(new Error("should not fulfill")),
      () => done()  // success - array_indexOf completed without infinite loop
    );
  }, 3000); // short timeout to catch infinite loop
});