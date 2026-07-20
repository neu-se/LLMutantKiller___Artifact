import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit check", () => {
  it("should not call process.emit when it is not a function during rejection handling", async () => {
    const originalEmit = process.emit;
    const emitCalled = jest.fn();
    
    // Replace emit with a non-function to detect if the check works
    (process as any).emit = undefined;
    
    try {
      const deferred = Q.defer();
      deferred.reject(new Error("test error"));
      await deferred.promise.catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 100));
      // Original passes (no crash), mutated crashes trying to call undefined
      expect(true).toBe(true);
    } catch (e) {
      throw e;
    } finally {
      process.emit = originalEmit;
    }
  });
});