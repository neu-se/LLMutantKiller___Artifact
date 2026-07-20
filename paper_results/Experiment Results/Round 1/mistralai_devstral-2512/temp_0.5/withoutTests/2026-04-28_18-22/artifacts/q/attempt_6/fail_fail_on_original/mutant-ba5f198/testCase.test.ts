const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q async scheduling behavior", () => {
  it("should correctly prioritize setImmediate over other mechanisms", (done) => {
    // Track execution order
    const executionOrder: string[] = [];
    let testCompleted = false;

    // Save original setImmediate
    const originalSetImmediate = global.setImmediate;

    // Mock setImmediate to track its usage
    global.setImmediate = function(callback: (...args: any[]) => void): any {
      executionOrder.push("setImmediate");
      return originalSetImmediate(() => {
        executionOrder.push("setImmediate-callback");
        callback();
      });
    };

    try {
      // Create a promise chain that will trigger async scheduling
      Q.resolve()
        .then(() => {
          executionOrder.push("promise-then");
          // In the original code, setImmediate should be used when available
          // The mutation would prevent this
          expect(executionOrder).toContain("setImmediate");
          testCompleted = true;
          done();
        })
        .catch((err: any) => {
          done(err);
        });

      // Give time for async operations
      setTimeout(() => {
        if (!testCompleted) {
          done(new Error("Test timed out - setImmediate was not used"));
        }
      }, 100);
    } finally {
      // Restore original setImmediate
      global.setImmediate = originalSetImmediate;
    }
  });
});