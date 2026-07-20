import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit typeof guard", () => {
  it("only calls process.emit when it is confirmed to be a function", (done) => {
    const originalEmit = process.emit;
    let callCount = 0;

    // Replace with a function that counts calls - this IS a function so both paths enter the block
    // But we need to test when it's NOT a function
    // Strategy: use a Proxy to detect property access pattern
    
    // Actually: set emit to a non-function, wrap in try/catch via domain or process error
    // The mutated code will throw TypeError synchronously inside the runAfter callback
    // which Node will emit as uncaughtException - but process.emit is gone!
    // So the error will be lost or crash. Let's detect the crash differently.

    // Better: make emit a spy function, check it's called only when it should be
    // In original: only called if typeof process.emit === "function" (it is, so called)
    // We need to test the guard itself. Let's temporarily make emit NOT a function
    // and verify no TypeError escapes.

    (process as any).emit = null;

    const errors: Error[] = [];
    
    // We need another way to catch errors since process.emit is null
    // Use process._events directly or domain
    const domain = require("domain");
    const d = domain.create();
    d.on("error", (err: Error) => {
      errors.push(err);
    });

    d.run(() => {
      Q.resetUnhandledRejections();
      Q.reject(new Error("test"));
    });

    setTimeout(() => {
      (process as any).emit = originalEmit;
      d.exit();
      Q.resetUnhandledRejections();
      
      // Original: typeof null !== "function" → block skipped → no error
      // Mutated: true → tries null(...) → TypeError → caught by domain
      expect(errors.length).toBe(0);
      done();
    }, 200);
  });
});