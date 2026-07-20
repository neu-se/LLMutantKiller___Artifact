import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should not call process.emit when process.emit is not a function", async () => {
    const originalEmit = process.emit;
    
    // Make process.emit not a function to distinguish && vs ||
    // With &&: condition is false, no emit call
    // With ||: condition is true (process is object), tries to call non-function emit
    (process as any).emit = "not-a-function";
    
    try {
      // Create a rejected promise and then handle it
      // This triggers untrackRejection which contains the mutated condition
      const rejected = Q.reject(new Error("test error"));
      
      // Attach a handler to trigger untrackRejection
      let resolvedValue: any;
      await rejected.then(null, (err) => {
        resolvedValue = err.message;
      });
      
      expect(resolvedValue).toBe("test error");
    } finally {
      process.emit = originalEmit;
    }
  });
});