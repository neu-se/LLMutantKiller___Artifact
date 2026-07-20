import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection unhandledRejection event", () => {
  it("should emit unhandledRejection event when a promise is rejected and unhandled", async () => {
    const emittedEvents: Array<{ reason: any; promise: any }> = [];
    
    const handler = (reason: any, promise: any) => {
      emittedEvents.push({ reason, promise });
    };
    
    process.on("unhandledRejection", handler);
    
    try {
      const error = new Error("test rejection for unhandledRejection event");
      
      // Create a rejected promise that is not handled
      Q.reject(error);
      
      // Wait for the async tracking to complete
      // Q uses nextTick.runAfter which runs after all nextTick tasks
      await new Promise<void>((resolve) => {
        // Use multiple ticks to ensure all Q internals have run
        setImmediate(() => {
          setImmediate(() => {
            setImmediate(() => {
              resolve();
            });
          });
        });
      });
      
      // The original code should have emitted unhandledRejection
      // The mutated code would NOT emit it because the condition check fails
      expect(emittedEvents.length).toBeGreaterThan(0);
      expect(emittedEvents[0].reason).toBe(error);
    } finally {
      process.removeListener("unhandledRejection", handler);
      Q.resetUnhandledRejections();
    }
  });
});