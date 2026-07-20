import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
  it("should not throw when process.emit is not a function", (done) => {
    Q.resetUnhandledRejections();

    const originalEmit = process.emit;
    // Replace process.emit with a non-function to test the guard
    (process as any).emit = undefined;

    let errorCaught = false;
    const originalOnerror = Q.onerror;

    // Listen for uncaught errors that would indicate the mutation
    const uncaughtHandler = (err: Error) => {
      errorCaught = true;
    };
    process.on("uncaughtException", uncaughtHandler);

    try {
      // Create a rejection - this triggers trackRejection internally
      Q.reject(new Error("test rejection"));

      // Give the async queue time to flush
      setTimeout(() => {
        process.emit = originalEmit;
        process.removeListener("uncaughtException", uncaughtHandler);
        Q.onerror = originalOnerror;
        Q.resetUnhandledRejections();

        // In the original code, the guard prevents calling process.emit when it's not a function
        // In the mutated code, it would try to call undefined as a function and throw
        expect(errorCaught).toBe(false);
        done();
      }, 100);
    } catch (e) {
      process.emit = originalEmit;
      process.removeListener("uncaughtException", uncaughtHandler);
      Q.onerror = originalOnerror;
      Q.resetUnhandledRejections();
      done.fail(e as Error);
    }
  });
});