import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation when progress callback throws", () => {
  it("should not notify downstream if the progress callback throws an error", (done) => {
    const def = Q.defer();
    
    // First promise in chain has a progress callback that throws
    const p2 = def.promise.progress(function () {
      throw new Error("intentional error in progress callback");
    });

    // Swallow errors from Q.onerror to prevent test noise
    Q.onerror = function () { /* swallow */ };

    const downstreamProgressValues: unknown[] = [];

    // Attach a downstream progress listener - it should NOT be called
    const result = p2.then(
      function () {
        // On resolution, verify no downstream progress was received
        expect(downstreamProgressValues).toEqual([]);
        Q.onerror = null;
        done();
      },
      function () {
        Q.onerror = null;
        done(new Error("should not reject"));
      },
      function (progressValue: unknown) {
        downstreamProgressValues.push(progressValue);
      }
    );

    // Trigger progress notification
    def.notify("test-value");
    // Then resolve to trigger the fulfillment callback
    def.resolve();
  });
});