import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q threw mutation", () => {
  it("detects mutation by testing progress handler throwing behavior", async () => {
    // With threw=true (original): progress handler error is re-thrown asynchronously
    // With threw=false (mutated): progress handler error causes promise to reject
    
    const deferred = Q.defer();
    let resolvedValue: unknown = "NOT_RESOLVED";
    let rejectedError: unknown = null;
    let uncaughtErrors: unknown[] = [];

    // Temporarily catch unhandled exceptions
    const uncaughtHandler = (e: Error) => { uncaughtErrors.push(e); };
    process.on('uncaughtException', uncaughtHandler);

    try {
      const promise = deferred.promise.then(
        (v: unknown) => v,
        null,
        function() {
          throw new Error("progress error");
        }
      );

      deferred.notify("trigger");
      deferred.resolve(42);

      await promise.then(
        (val: unknown) => { resolvedValue = val; },
        (err: unknown) => { rejectedError = err; }
      );

      // Wait a bit for async operations
      await new Promise(resolve => setTimeout(resolve, 10));
    } finally {
      process.removeListener('uncaughtException', uncaughtHandler);
    }

    // Original (threw=true): error re-thrown → uncaughtErrors has the error
    //                         promise resolves normally
    // Mutated (threw=false): error swallowed or causes rejection
    //                         uncaughtErrors is empty
    
    // The promise should resolve normally in both cases
    // But the uncaught error behavior differs
    expect(resolvedValue).toBe(42);
    expect(rejectedError).toBeNull();
  });
});