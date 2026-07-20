describe("array_indexOf fallback shim", () => {
  it("should complete processing without infinite loop when indexOf fallback is used", (done) => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    // @ts-ignore
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.indexOf = originalIndexOf;

    QFresh.resetUnhandledRejections();

    let completed = false;

    // reject() calls trackRejection which schedules runAfter
    // runAfter calls array_indexOf(unhandledRejections, promise)
    // unhandledRejections has 1 element at this point
    // With i-- (mutated): infinite loop, completed stays false
    // With i++ (original): completes, then we can schedule more work
    QFresh.reject(new Error("test"));

    // Schedule work that can only run if the flush() loop completes
    // (i.e., runAfter doesn't infinite loop)
    QFresh.when(QFresh(42), (val: number) => {
      completed = true;
      expect(val).toBe(42);
      expect(completed).toBe(true);
      done();
    });
  });
});