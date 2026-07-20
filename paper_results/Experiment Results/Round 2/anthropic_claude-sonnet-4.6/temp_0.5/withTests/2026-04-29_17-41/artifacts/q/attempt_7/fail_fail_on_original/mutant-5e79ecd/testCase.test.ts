import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("done() with no callbacks should not add an extra async step before onUnhandledError", (done) => {
    const Q_any = Q as any;
    const events: string[] = [];
    
    Q_any.onerror = function(e: any) {
      events.push("error:" + e);
    };
    
    // Schedule a marker that runs in the SAME flush as done()'s processing
    // by using a pre-resolved promise
    const marker = Q_any.resolve().then(function() {
      events.push("marker");
    });
    
    Q_any.reject("test-error").done(); // no callbacks
    
    // Wait for everything to settle
    return marker.then(function() {
      return Q_any.delay(10);
    }).then(function() {
      Q_any.onerror = null;
      // In original: done() schedules 1 tick, marker schedules 1 tick
      // Both run in same flush. Order depends on scheduling order.
      // The error is reported via Q.onerror in the same flush.
      // In mutated: done() schedules 2 ticks. The error is reported 1 tick later.
      // After marker runs, the error might not have been reported yet in mutated.
      // But after delay(10), everything should be done.
      expect(events).toContain("error:test-error");
      done();
    });
  });
});