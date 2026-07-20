import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeJS flag behavior", () => {
  it("should process all pending promise callbacks even when one handler throws an error", (done) => {
    const results: number[] = [];

    const d1 = Q.defer();
    const d2 = Q.defer();

    // First promise handler throws
    d1.promise.then(() => {
      throw new Error("intentional error in handler");
    }).fail(() => {
      results.push(1);
    });

    // Second promise handler should also run
    d2.promise.then(() => {
      results.push(2);
    });

    // Resolve both before the next tick
    d1.resolve();
    d2.resolve();

    // With isNodeJS = false (original): both handlers run in same flush
    // With isNodeJS = true (mutated): flush is interrupted after first exception
    // so second handler may be deferred to a later tick
    // We check that both eventually complete, but the key is the ordering/timing

    // Use a longer delay to ensure all processing is done
    setTimeout(() => {
      try {
        expect(results).toContain(1);
        expect(results).toContain(2);
        // With isNodeJS=false, both run in same flush cycle
        // The test verifies both complete - this should pass in both cases
        // Let's check ordering instead
        expect(results[0]).toBe(1);
        expect(results[1]).toBe(2);
        done();
      } catch (e) {
        done(e);
      }
    }, 200);
  });
});