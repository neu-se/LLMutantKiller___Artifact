describe("array_indexOf fallback shim", () => {
  it("should correctly find elements when iterating forward in the indexOf fallback", (done) => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    // @ts-ignore
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Restore native indexOf so rest of test environment works normally
    Array.prototype.indexOf = originalIndexOf;

    // untrackRejection calls array_indexOf on the unhandledRejections array.
    // With i++ (original): finds the promise and removes it correctly.
    // With i-- (mutated): infinite loop, test times out and fails.
    QFresh.resetUnhandledRejections();

    // Reject a promise - this adds it to unhandledRejections array
    const p = QFresh.reject(new Error("test rejection"));

    // Handle the rejection - this triggers untrackRejection -> array_indexOf
    p.then(null, () => {
      // Give nextTick time to process untrackRejection
      setTimeout(() => {
        expect(QFresh.getUnhandledReasons().length).toBe(0);
        done();
      }, 200);
    });
  });
});