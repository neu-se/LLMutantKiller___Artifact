import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("emits rejectionHandled event when a reported unhandled rejection is later handled", (done) => {
    Q.resetUnhandledRejections();

    const rejectionHandledEvents: any[] = [];
    const originalEmit = process.emit.bind(process);
    
    // Intercept process.emit to capture rejectionHandled events
    const mockEmit = function(event: string, ...args: any[]): boolean {
      if (event === "rejectionHandled") {
        rejectionHandledEvents.push(args);
      }
      return originalEmit(event, ...args);
    };
    (process as any).emit = mockEmit;

    // First, create a rejection and let it be reported as unhandled
    const reason = new Error("unhandled rejection test");
    const rejected = Q.reject(reason);

    // Force the unhandledRejection reporting to happen
    Q.nextTick.runAfter(function() {
      // Now handle the rejection - should trigger rejectionHandled
      rejected.fail(function() { return; });

      Q.nextTick.runAfter(function() {
        (process as any).emit = originalEmit;
        
        // In original: process.emit IS a function → rejectionHandled IS emitted
        // In mutated: process.emit IS a function but condition is !== → rejectionHandled NOT emitted
        expect(rejectionHandledEvents.length).toBe(1);
        done();
      });
    });
  });
});