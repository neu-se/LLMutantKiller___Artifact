import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process emit", () => {
  it("emits rejectionHandled when a reported unhandled rejection is later handled", async () => {
    Q.resetUnhandledRejections();

    const rejectionHandledEmitted: any[] = [];
    
    // Listen for the rejectionHandled event
    const handler = (reason: any, promise: any) => {
      rejectionHandledEmitted.push({ reason, promise });
    };
    process.on("rejectionHandled", handler);

    try {
      const error = new Error("test error");
      const p = Q.reject(error);

      // Multiple flushes to ensure unhandledRejection is reported
      // (trackRejection uses runAfter which fires after all then'd tasks)
      await new Promise<void>(resolve => setImmediate(resolve));
      await new Promise<void>(resolve => setImmediate(resolve));
      await new Promise<void>(resolve => setImmediate(resolve));

      // Now handle the rejection - triggers untrackRejection
      p.fail(() => null);

      // Flush again to let untrackRejection's runAfter fire
      await new Promise<void>(resolve => setImmediate(resolve));
      await new Promise<void>(resolve => setImmediate(resolve));
      await new Promise<void>(resolve => setImmediate(resolve));

      // Original code: process.emit === "function" is TRUE → rejectionHandled IS emitted
      // Mutated code: process.emit !== "function" is FALSE → rejectionHandled NOT emitted
      expect(rejectionHandledEmitted.length).toBe(1);
    } finally {
      process.removeListener("rejectionHandled", handler);
    }
  });
});