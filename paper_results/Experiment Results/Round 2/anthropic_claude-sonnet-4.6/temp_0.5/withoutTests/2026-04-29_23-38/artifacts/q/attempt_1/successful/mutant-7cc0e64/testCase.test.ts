import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not throw when calling done() on a fulfilled promise without an active domain", async () => {
    // Ensure no domain is active
    // In standard Node.js, process.domain is null when no domain is active
    // The mutation changes `if (typeof process === "object" && process && process.domain)`
    // to `if (true)`, which causes process.domain.bind() to throw a TypeError
    // when process.domain is null/undefined
    
    let caughtError: Error | null = null;
    
    // Temporarily capture any synchronous errors that might be thrown
    const originalHandler = process.listeners("uncaughtException");
    
    // Make sure we're not in a domain
    const currentDomain = (process as any).domain;
    
    // If we're in a domain, temporarily remove it to test the no-domain path
    if (currentDomain) {
      (process as any).domain = null;
    }
    
    try {
      // This should work without throwing in the original code
      // In the mutated code, it will try process.domain.bind() where process.domain is null
      const promise = Q.resolve(42);
      
      // done() is the method that contains the mutated code
      // We need to call it and ensure it doesn't throw synchronously
      promise.done();
    } catch (e) {
      caughtError = e as Error;
    } finally {
      // Restore domain if we changed it
      if (currentDomain) {
        (process as any).domain = currentDomain;
      }
    }
    
    // In original code: no error because process.domain is falsy, condition is false
    // In mutated code: TypeError because process.domain is null and null.bind() throws
    expect(caughtError).toBeNull();
    
    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 50));
  });
});