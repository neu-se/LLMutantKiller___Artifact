describe("array_indexOf fallback shim direction", () => {
  it("should use forward iteration in indexOf fallback to correctly locate elements", (done) => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    // @ts-ignore
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.indexOf = originalIndexOf;

    // array_indexOf with i-- on a non-empty array causes infinite loop.
    // trackRejection calls array_indexOf(unhandledRejections, promise) via runAfter.
    // We need to trigger the runAfter callback which checks array_indexOf result.
    
    // Use process.emit mock to detect if unhandledRejection fires
    // Instead, just verify that after handling, the reasons array is empty.
    // The infinite loop would prevent done() from ever being called -> timeout failure.

    QFresh.resetUnhandledRejections();

    const p = QFresh.reject(new Error("test"));

    // Catch it to trigger untrackRejection
    QFresh.when(p, null, () => {
      process.nextTick(() => {
        process.nextTick(() => {
          expect(QFresh.getUnhandledReasons().length).toBe(0);
          done();
        });
      });
    });
  });
});