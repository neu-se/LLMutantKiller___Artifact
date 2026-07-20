import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeJS flag behavior", () => {
  it("should continue processing other promise resolutions even when one handler throws", (done) => {
    const results: number[] = [];

    // Set up Q.onerror to swallow errors so they don't propagate
    const originalOnerror = Q.onerror;
    Q.onerror = () => {};

    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // First promise handler throws
    deferred1.promise.then(() => {
      throw new Error("intentional error");
    });

    // Second promise handler should still be called
    deferred2.promise.then(() => {
      results.push(2);
    });

    // Resolve both in the same tick so they flush together
    deferred1.resolve("value1");
    deferred2.resolve("value2");

    // Give enough time for async processing
    setTimeout(() => {
      Q.onerror = originalOnerror;
      try {
        // With isNodeJS=false (original): both handlers run, results contains 2
        // With isNodeJS=true (mutated): the throw interrupts flush, results may be empty
        expect(results).toEqual([2]);
        done();
      } catch (e) {
        done(e);
      }
    }, 200);
  });
});