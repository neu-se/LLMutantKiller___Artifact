import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit mutation", () => {
  it("should not throw when process.emit is not a function and rejection is handled", async () => {
    const originalEmit = process.emit;
    (process as any).emit = "not-a-function";

    let caughtError: any = null;
    const originalNextTick = process.nextTick;
    
    // Capture errors thrown in nextTick
    process.nextTick = function(cb: any, ...args: any[]) {
      return originalNextTick(() => {
        try { cb(...args); } catch(e) { caughtError = e; }
      });
    } as any;

    try {
      Q.resetUnhandledRejections();
      const deferred = Q.defer();
      deferred.reject(new Error("test"));
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      deferred.promise.fail(() => {});
      
      await new Promise(resolve => setTimeout(resolve, 100));
    } finally {
      process.emit = originalEmit;
      process.nextTick = originalNextTick;
    }

    expect(caughtError).toBeNull();
  });
});