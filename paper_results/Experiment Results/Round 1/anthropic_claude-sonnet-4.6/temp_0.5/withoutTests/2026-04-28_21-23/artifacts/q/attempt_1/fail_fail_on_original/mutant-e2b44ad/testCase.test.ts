import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done with process.domain", () => {
  it("should bind onUnhandledError to process.domain when process is an object and domain exists", async () => {
    // Save original process.domain
    const originalDomain = (process as any).domain;
    
    let bindCalled = false;
    const mockBoundFn = jest.fn();
    
    // Create a mock domain
    const mockDomain = {
      bind: jest.fn((fn: Function) => {
        bindCalled = true;
        return mockBoundFn;
      })
    };
    
    // Set process.domain to our mock
    (process as any).domain = mockDomain;
    
    try {
      // Create a rejected promise and call done() without handlers
      // This should trigger the domain binding code path
      const rejectedPromise = Q.reject(new Error("test error"));
      
      // Call done() - this is where the mutation affects behavior
      // In original: typeof process === "object" is true, so domain.bind is called
      // In mutated: typeof process === "" is false, so domain.bind is NOT called
      rejectedPromise.done();
      
      // Wait for async operations to complete
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // In the original code, process.domain.bind should have been called
      // In the mutated code, it won't be called
      expect(bindCalled).toBe(true);
    } finally {
      // Restore original domain
      (process as any).domain = originalDomain;
    }
  });
});