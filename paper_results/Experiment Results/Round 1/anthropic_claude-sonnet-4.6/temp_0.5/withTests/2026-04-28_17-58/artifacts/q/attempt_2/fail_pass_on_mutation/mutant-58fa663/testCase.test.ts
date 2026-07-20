import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit condition", () => {
  it("should not call process.emit when process is an object but process.emit is not a function", done => {
    Q.resetUnhandledRejections();

    const originalEmit = process.emit;
    const emittedEvents: string[] = [];

    // Replace process.emit with a non-function to test the && vs || condition
    // With &&: typeof process === "object" (true) && typeof process.emit === "function" (false) => false, no emit
    // With ||: typeof process === "object" (true) || ... => true, tries to call non-function emit => crash or wrong behavior
    (process as any).emit = "not-a-function";

    try {
      const rejection = Q.reject(new Error("test"));

      setTimeout(() => {
        expect(Q.getUnhandledReasons().length).toBe(1);

        // Handle the rejection - this triggers untrackRejection
        // Original code: condition is false (emit not a function), so no emit call - safe
        // Mutated code: condition is true (process is object), tries to schedule emit call
        rejection.fail(() => {});

        setTimeout(() => {
          // Restore
          process.emit = originalEmit;
          expect(Q.getUnhandledReasons().length).toBe(0);
          done();
        }, 100);
      }, 50);
    } catch (e) {
      process.emit = originalEmit;
      done(e);
    }
  });
});