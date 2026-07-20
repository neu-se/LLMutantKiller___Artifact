import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not create an extra rejected promise when done() is called with no callbacks", () => {
    const Q_any = Q as any;
    
    // Set onerror before anything to prevent uncaught throws
    Q_any.onerror = function() {};
    Q_any.resetUnhandledRejections();

    const rejection = Q_any.reject("test-reason");
    // unhandledReasons now has 1 entry

    rejection.done(); // no callbacks

    // After calling done() with no callbacks:
    // Original: promise = this (rejection itself), schedules 1 tick to handle it
    // Mutated:  promise = this.then(...) (new rejected promise), schedules 2 ticks
    //
    // After the first scheduled tick:
    // Original: untrackRejection(rejection) called -> unhandledReasons = []
    // Mutated:  untrackRejection(rejection) called BUT trackRejection(newPromise) also called
    //           -> unhandledReasons still has 1 entry
    //
    // We check unhandledReasons after the first tick by scheduling via nextTick
    // (which runs after already-queued ticks in FIFO order)

    return Q_any.when(Q_any.resolve(), function() {
      const reasons = Q_any.getUnhandledReasons();
      Q_any.onerror = null;
      expect(reasons.length).toBe(0);
    });
  });
});