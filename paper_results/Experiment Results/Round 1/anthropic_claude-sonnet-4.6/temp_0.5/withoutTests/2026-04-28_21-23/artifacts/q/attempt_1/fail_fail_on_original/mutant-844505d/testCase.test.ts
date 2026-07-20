import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done domain binding", () => {
  it("should bind onUnhandledError to process.domain when process.domain exists", async () => {
    const originalDomain = (process as any).domain;
    
    let bindWasCalled = false;
    let boundFunction: Function | null = null;
    
    // Set up a fake domain with a bind method
    const fakeDomain = {
      bind: (fn: Function) => {
        bindWasCalled = true;
        boundFunction = fn;
        // Return a wrapped function so we can verify binding occurred
        return function wrappedByDomain(...args: any[]) {
          return fn(...args);
        };
      },
      run: (fn: Function) => fn(),
      exit: () => {},
      enter: () => {},
    };
    
    (process as any).domain = fakeDomain;
    
    try {
      // Create a rejected promise and call .done() on it
      // This should trigger the domain binding check
      const rejectedPromise = Q.reject(new Error("test error"));
      
      // Call done() - this is where the domain binding happens
      // We need to catch the unhandled error to prevent test failure
      let errorThrown = false;
      const originalOnerror = Q.onerror;
      Q.onerror = () => { errorThrown = true; };
      
      rejectedPromise.done();
      
      // Wait for async operations to complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      Q.onerror = originalOnerror;
      
      // In the original code, bind should have been called on the domain
      expect(bindWasCalled).toBe(true);
    } finally {
      (process as any).domain = originalDomain;
    }
  });
});