import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("only schedules rejectionHandled notification when process.emit is a function", (done) => {
    const originalEmit = process.emit;
    Q.resetUnhandledRejections();

    const caughtErrors: Error[] = [];

    // Register handler BEFORE replacing process.emit so it works
    const uncaughtHandler = (err: Error) => {
      caughtErrors.push(err);
    };
    process.on("uncaughtException", uncaughtHandler);

    const error = new Error("test rejection");
    const rejected = Q.reject(error);

    // Wait for trackRejection's runAfter to fire so promise is in reportedUnhandledRejections
    setTimeout(() => {
      // Replace process.emit with a non-function
      // Original: typeof process.emit === "function" → false → skips runAfter scheduling → no error
      // Mutant:   condition is always true → schedules runAfter → runAfter calls undefined() → TypeError
      (process as any).emit = 42;

      rejected.fail(() => "handled");

      setTimeout(() => {
        // Restore before assertions so removeListener works
        (process as any).emit = originalEmit;
        process.removeListener("uncaughtException", uncaughtHandler);

        expect(caughtErrors.filter(e => e instanceof TypeError).length).toBe(0);
        done();
      }, 300);
    }, 200);
  });
});