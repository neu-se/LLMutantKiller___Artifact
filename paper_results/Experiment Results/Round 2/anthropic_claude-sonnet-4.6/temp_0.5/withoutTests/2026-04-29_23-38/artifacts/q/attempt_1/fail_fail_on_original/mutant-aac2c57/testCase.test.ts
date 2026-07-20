import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not throw when process.domain is not set and promise resolves", async () => {
    // In Node.js, typeof process === "object" is always true.
    // The original code uses && so it also checks process.domain exists.
    // The mutated code uses || so it always enters the branch and tries
    // process.domain.bind(...), which throws because process.domain is null/undefined.
    
    // Ensure we're not in a domain context
    const originalDomain = (process as any).domain;
    (process as any).domain = null;
    
    try {
      await new Promise<void>((resolve, reject) => {
        const p = Q.resolve(42);
        
        // done() should complete without error when process.domain is null
        // With the mutation, it will try null.bind(...) and throw
        try {
          p.done(
            function () {
              resolve();
            },
            function (err: any) {
              reject(err);
            }
          );
        } catch (e) {
          reject(e);
        }
      });
    } finally {
      (process as any).domain = originalDomain;
    }
  });
});