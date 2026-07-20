import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not throw when process.domain is falsy and done is called without callbacks", async () => {
    // Ensure process.domain is not set (default in Node.js without domains)
    const originalDomain = process.domain;
    
    // Make sure process.domain is null/undefined (the default)
    // In Node.js, process.domain is null by default when not using domains
    expect(process.domain).toBeFalsy();
    
    // The mutated code changes:
    //   if (typeof process === "object" && process && process.domain)
    // to:
    //   if (typeof process === "object" && process || process.domain)
    // 
    // In Node.js, typeof process === "object" && process is always true,
    // so the mutated code always enters the if block and tries to call
    // process.domain.bind(onUnhandledError), which throws TypeError
    // when process.domain is null/undefined.
    
    let errorThrown: Error | null = null;
    
    try {
      // Call done() on a fulfilled promise - this should work without throwing
      const result = await new Promise<void>((resolve, reject) => {
        let completed = false;
        
        Q(42).done(
          function () {
            completed = true;
            resolve();
          },
          function (err: Error) {
            reject(err);
          }
        );
        
        // Set a timeout to resolve if done doesn't call our callbacks
        // (which shouldn't happen for a fulfilled promise)
        setTimeout(() => {
          if (!completed) {
            resolve();
          }
        }, 100);
      });
    } catch (err) {
      errorThrown = err as Error;
    }
    
    // The original code should not throw a TypeError about process.domain
    expect(errorThrown).toBeNull();
  });
});