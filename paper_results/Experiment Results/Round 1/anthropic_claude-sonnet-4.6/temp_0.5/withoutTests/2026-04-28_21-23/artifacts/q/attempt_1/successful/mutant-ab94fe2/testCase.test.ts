import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done error handling", () => {
  it("should call Q.onerror when a rejected promise is passed to done", async () => {
    const originalOnerror = Q.onerror;
    
    let caughtError: Error | null = null;
    
    Q.onerror = function(err: Error) {
      caughtError = err;
    };
    
    const expectedError = new Error("test rejection error");
    
    Q.reject(expectedError).done();
    
    // Wait for async ticks to process
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100);
    });
    
    Q.onerror = originalOnerror;
    
    expect(caughtError).toBe(expectedError);
  });
});