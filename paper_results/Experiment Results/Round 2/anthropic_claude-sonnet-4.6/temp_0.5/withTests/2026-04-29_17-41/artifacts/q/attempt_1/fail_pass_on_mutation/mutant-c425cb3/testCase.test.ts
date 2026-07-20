import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation when callback throws", () => {
  it("should not propagate progress notifications when the progress callback throws an error", (done) => {
    const deferred = Q.defer();
    const downstreamProgressValues: unknown[] = [];

    // Suppress Q.onerror to prevent unhandled error noise
    const originalOnerror = Q.onerror;
    Q.onerror = function () { /* swallow */ };

    const p2 = deferred.promise.progress(function () {
      throw new Error("progress callback threw!");
    });

    p2.then(
      function () {
        Q.onerror = originalOnerror;
        expect(downstreamProgressValues).toEqual([]);
        done();
      },
      function () {
        Q.onerror = originalOnerror;
        expect(downstreamProgressValues).toEqual([]);
        done();
      },
      function (progressValue: unknown) {
        downstreamProgressValues.push(progressValue);
      }
    );

    deferred.notify("test-progress");
    deferred.resolve();
  });
});