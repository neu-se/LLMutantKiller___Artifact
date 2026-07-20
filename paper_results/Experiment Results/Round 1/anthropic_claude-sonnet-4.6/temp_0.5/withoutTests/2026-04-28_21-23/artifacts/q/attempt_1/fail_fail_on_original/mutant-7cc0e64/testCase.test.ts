import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done behavior without process.domain", () => {
  it("should not throw when calling done() on a fulfilled promise when process.domain is not set", async () => {
    // Ensure process.domain is not set (normal case)
    const originalDomain = (process as any).domain;
    (process as any).domain = null;
    
    try {
      // This should work without throwing in the original code
      // In the mutated code, `if (true)` causes it to try `null.bind(...)` which throws
      expect(() => {
        Q.resolve(42).done();
      }).not.toThrow();
    } finally {
      (process as any).domain = originalDomain;
    }
  });
});