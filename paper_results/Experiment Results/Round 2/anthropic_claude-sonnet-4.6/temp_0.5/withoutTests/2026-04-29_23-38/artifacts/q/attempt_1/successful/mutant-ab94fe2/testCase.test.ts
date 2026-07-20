import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done error propagation", () => {
  it("should call Q.onerror with the rejection reason when a rejected promise is done", async () => {
    const originalOnerror = Q.onerror;
    
    try {
      const error = new Error("test rejection error");
      let capturedError: Error | null = null;
      
      Q.onerror = function (err: Error) {
        capturedError = err;
      };
      
      const rejectedPromise = Q.reject(error);
      rejectedPromise.done();
      
      // Wait for async ticks to process
      await new Promise<void>((resolve) => {
        // Give enough time for nextTick callbacks to fire
        setTimeout(resolve, 100);
      });
      
      expect(capturedError).toBe(error);
    } finally {
      Q.onerror = originalOnerror;
    }
  });
});