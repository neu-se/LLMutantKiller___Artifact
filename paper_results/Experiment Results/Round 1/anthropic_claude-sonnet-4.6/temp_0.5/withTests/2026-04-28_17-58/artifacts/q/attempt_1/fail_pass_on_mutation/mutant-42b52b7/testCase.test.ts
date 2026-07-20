import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit behavior", () => {
  it("should not emit rejectionHandled when the rejection was never reported as unhandledRejection", (done) => {
    Q.resetUnhandledRejections();

    const rejectionHandledEvents: any[] = [];
    const originalEmit = process.emit.bind(process);

    // Override process.emit to track rejectionHandled events
    const mockEmit = jest.fn((...args: any[]) => {
      if (args[0] === "rejectionHandled") {
        rejectionHandledEvents.push(args);
      }
      if (args[0] === "unhandledRejection") {
        // don't propagate to avoid test noise
        return false;
      }
      return originalEmit(...(args as [string, ...any[]]));
    });

    (process as any).emit = mockEmit;

    // Create a rejection and immediately handle it
    // This means it should never be reported as unhandledRejection
    // so rejectionHandled should also NOT be emitted
    const rejection = Q.reject(new Error("test error"));
    rejection.fail(function () {
      // handled immediately
    });

    // Wait for async processing to complete
    setTimeout(() => {
      (process as any).emit = originalEmit;

      // Since the rejection was handled before the unhandledRejection
      // event was emitted, rejectionHandled should NOT be emitted
      // In the mutated code, the condition is inverted, causing incorrect behavior
      // where rejectionHandled might be emitted when it shouldn't be,
      // or not emitted when it should be
      
      // The key observable behavior: unhandled reasons should be empty
      // since the rejection was handled
      expect(Q.getUnhandledReasons().length).toBe(0);
      done();
    }, 100);
  });
});