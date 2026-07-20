import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("does not try to invoke process.emit when it is not a function", (done) => {
    const originalEmit = process.emit;

    Q.resetUnhandledRejections();

    // Set process.emit to a non-function value
    // Original code: checks `typeof process.emit === "function"` → false → skips block
    // Mutated code: checks `typeof process === "object" && true` → true → tries to call
    //               process.emit(...) which is not a function → TypeError in runAfter
    (process as any).emit = 42;

    const errors: Error[] = [];
    // We need to capture errors thrown inside runAfter callbacks.
    // In Node.js, errors in the flush loop get re-thrown via setTimeout,
    // so they become uncaughtExceptions.
    // But we can't use process.on here since emit is broken.
    // Instead, override process.emit back to original to capture the event.
    // Actually let's use a different approach: wrap in a domain or use
    // the fact that the error propagates to Q.onerror or similar.
    
    // Restore emit immediately so uncaughtException handler works,
    // but keep a flag to detect if the non-function path was hit.
    let calledAsNonFunction = false;
    Object.defineProperty(process, "emit", {
      get() { return 42; },
      configurable: true,
    });

    // Use the real emit for uncaughtException listening
    originalEmit.call(process, "newListener", "uncaughtException", () => {});
    const uncaughtErrors: string[] = [];
    const handler = (err: Error) => { uncaughtErrors.push(err.message); };
    process.on("uncaughtException", handler);

    const error = new Error("test rejection to handle");
    const rejected = Q.reject(error);
    rejected.fail(() => "handled");

    setTimeout(() => {
      Object.defineProperty(process, "emit", {
        value: originalEmit,
        configurable: true,
        writable: true,
      });
      process.removeListener("uncaughtException", handler);

      // Original: no TypeError, uncaughtErrors is empty
      // Mutant: TypeError from calling 42(...), uncaughtErrors has an entry
      expect(uncaughtErrors.filter(m => /not a function/i.test(m) || /is not a function/i.test(m)).length).toBe(0);
      done();
    }, 300);
  });
});