import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit guard", () => {
  it("should not attempt to call process.emit when it is not a function", (done) => {
    const originalEmit = process.emit;
    let errorCaught = false;

    // Replace process.emit with a non-function
    (process as any).emit = undefined;

    // Override Q.onerror to catch any errors thrown asynchronously
    const originalOnerror = (Q as any).onerror;

    // Create a rejected promise (triggers trackRejection)
    const rejected = Q.reject(new Error("test"));

    // Attach a handler (triggers untrackRejection -> the mutated if block)
    rejected.fail(function () {
      return "handled";
    });

    // In the mutated code, runAfter callback will try to call process.emit("rejectionHandled")
    // but process.emit is undefined, so it throws TypeError
    // We detect this by checking if an uncaught error occurs

    // Use a domain or uncaughtException to catch it
    const uncaughtHandler = (err: Error) => {
      errorCaught = true;
    };
    process.on("uncaughtException", uncaughtHandler);

    setTimeout(() => {
      process.removeListener("uncaughtException", uncaughtHandler);
      (process as any).emit = originalEmit;
      (Q as any).onerror = originalOnerror;

      // Original code: errorCaught should be false (guarded by typeof check)
      // Mutated code: errorCaught should be true (no guard, tries to call undefined)
      expect(errorCaught).toBe(false);
      done();
    }, 200);
  });
});