import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection rejectionHandled event", () => {
  it("should emit rejectionHandled when a previously reported unhandled rejection is handled", async () => {
    const rejectionHandledEvents: any[] = [];

    const rejectionHandledListener = (...args: any[]) => {
      rejectionHandledEvents.push(args);
    };

    process.on("rejectionHandled", rejectionHandledListener);

    try {
      const reason = new Error("test unhandled rejection");
      // Create a rejected promise - starts tracking
      const rejectedPromise = Q.reject(reason);

      // Wait for the unhandledRejection event to fire (meaning it's been added to reportedUnhandledRejections)
      await new Promise<void>((resolve) => {
        process.once("unhandledRejection", (_reason, _promise) => {
          resolve();
        });
      });

      // Now handle the rejection - this calls untrackRejection
      // which should schedule emitting "rejectionHandled"
      rejectedPromise.then(null, () => {});

      // Wait for the runAfter tasks to execute
      await new Promise<void>((resolve) => setTimeout(resolve, 50));

      expect(rejectionHandledEvents.length).toBeGreaterThan(0);
    } finally {
      process.removeListener("rejectionHandled", rejectionHandledListener);
    }
  });
});