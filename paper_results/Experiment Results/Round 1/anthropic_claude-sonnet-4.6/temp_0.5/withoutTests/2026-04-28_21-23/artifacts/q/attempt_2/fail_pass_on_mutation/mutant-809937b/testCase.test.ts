import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("checks typeof process.emit before calling it", async () => {
    const originalEmit = process.emit;
    const errors: Error[] = [];
    
    const uncaughtHandler = (err: Error) => errors.push(err);
    process.on("uncaughtException", uncaughtHandler);
    
    (process as any).emit = 42; // not a function - will throw if called
    
    try {
      const deferred = Q.defer();
      deferred.reject(new Error("test"));
      await deferred.promise.catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 100));
    } finally {
      process.emit = originalEmit;
      process.removeListener("uncaughtException", uncaughtHandler);
    }
    
    // Original: no error (emit not called because typeof check fails)
    // Mutated: error thrown (emit called even though it's not a function)
    expect(errors.length).toBe(0);
  });
});