describe("array_indexOf fallback shim", () => {
  it("should find promise in unhandledRejections array using forward iteration", (done) => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore
    delete Array.prototype.indexOf;

    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    // @ts-ignore
    const QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Array.prototype.indexOf = originalIndexOf;

    QFresh.resetUnhandledRejections();

    // trackRejection calls array_indexOf(unhandledRejections, promise) via runAfter
    // With i-- and a non-empty unhandledRejections array, this infinite loops
    // The runAfter queue runs after all nextTick tasks complete in flush()
    
    const p = QFresh.reject(new Error("test"));

    // Wait for the runAfter to execute (which calls array_indexOf on non-empty array)
    // On original: completes fine
    // On mutated: infinite loop in array_indexOf -> never calls done -> timeout
    setTimeout(() => {
      try {
        // If we get here without hanging, array_indexOf worked correctly
        expect(true).toBe(true);
        done();
      } catch(e) {
        done(e);
      }
    }, 500);
  });
});