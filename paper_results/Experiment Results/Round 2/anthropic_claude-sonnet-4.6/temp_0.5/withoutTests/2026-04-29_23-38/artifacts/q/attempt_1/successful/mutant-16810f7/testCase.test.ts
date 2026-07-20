import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit behavior", () => {
  it("should emit rejectionHandled event when a rejected promise is handled after being reported as unhandled", async () => {
    // We need to:
    // 1. Create a rejected promise that gets tracked as unhandled
    // 2. Then handle it (which calls untrackRejection)
    // 3. Verify that process.emit("rejectionHandled") was called

    const rejectionHandledEvents: Array<{ reason: any; promise: any }> = [];
    
    const handler = (reason: any, promise: any) => {
      rejectionHandledEvents.push({ reason, promise });
    };
    
    process.on("rejectionHandled", handler);

    const unhandledRejectionEvents: Array<{ reason: any; promise: any }> = [];
    const unhandledHandler = (reason: any, promise: any) => {
      unhandledRejectionEvents.push({ reason, promise });
    };
    process.on("unhandledRejection", unhandledHandler);

    try {
      // Create a rejected Q promise - this will be tracked as unhandled
      const reason = new Error("test rejection for tracking");
      const rejectedPromise = Q.reject(reason);

      // Wait for the unhandledRejection to be reported (via nextTick.runAfter)
      await new Promise<void>((resolve) => {
        // Give time for the unhandledRejection event to fire
        setImmediate(() => setImmediate(() => setImmediate(() => resolve())));
      });

      // Now handle the rejection - this should trigger untrackRejection
      // which should emit "rejectionHandled"
      rejectedPromise.then(null, () => {
        // handled
      });

      // Wait for the rejectionHandled event to potentially fire
      await new Promise<void>((resolve) => {
        setImmediate(() => setImmediate(() => setImmediate(() => setImmediate(() => resolve()))));
      });

      // In the original code, rejectionHandled should be emitted
      // In the mutated code, it won't be emitted because typeof process === "" is false
      expect(rejectionHandledEvents.length).toBeGreaterThan(0);
    } finally {
      process.removeListener("rejectionHandled", handler);
      process.removeListener("unhandledRejection", unhandledHandler);
    }
  });
});