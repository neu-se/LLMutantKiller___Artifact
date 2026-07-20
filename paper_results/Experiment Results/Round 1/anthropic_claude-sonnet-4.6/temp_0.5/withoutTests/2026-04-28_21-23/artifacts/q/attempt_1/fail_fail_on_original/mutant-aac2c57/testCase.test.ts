import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not throw when process.domain is not set and promise resolves", async () => {
    // In Node.js, process.domain is null/undefined by default (no active domain)
    // The original code checks: typeof process === "object" && process && process.domain
    // The mutated code checks: typeof process === "object" || process && process.domain
    // In Node.js, typeof process === "object" is always true, so the mutated code
    // will always try to call process.domain.bind(...), which throws when process.domain is null

    // Ensure process.domain is not set
    const originalDomain = (process as any).domain;
    (process as any).domain = null;

    try {
      await new Promise<void>((resolve, reject) => {
        const q = Q.resolve(42);
        
        // .done() should not throw when process.domain is null
        // In the mutated version, it will try to call null.bind(...) which throws TypeError
        let errorThrown = false;
        try {
          q.done(
            function () {
              resolve();
            },
            function (err: any) {
              reject(err);
            }
          );
        } catch (e) {
          errorThrown = true;
          reject(e);
        }
        
        if (!errorThrown) {
          // If no synchronous error, resolve after a tick
          setTimeout(resolve, 100);
        }
      });
    } finally {
      (process as any).domain = originalDomain;
    }
  });
});