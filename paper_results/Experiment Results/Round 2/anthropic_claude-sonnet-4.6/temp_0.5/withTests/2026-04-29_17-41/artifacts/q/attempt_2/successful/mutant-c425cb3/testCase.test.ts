import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation when callback throws", () => {
  it("should not propagate progress downstream when the progress callback throws", (done) => {
    const deferred = Q.defer();
    let downstreamProgressCallCount = 0;

    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = function () { /* swallow thrown progress errors */ };

    const p2 = (deferred.promise as any).progress(function () {
      throw new Error("intentional throw in progress callback");
    });

    p2.then(
      function () {
        (Q as any).onerror = originalOnerror;
        expect(downstreamProgressCallCount).toBe(0);
        done();
      },
      function () {
        (Q as any).onerror = originalOnerror;
        expect(downstreamProgressCallCount).toBe(0);
        done();
      },
      function () {
        downstreamProgressCallCount++;
      }
    );

    deferred.notify("value");
    deferred.resolve();
  });
});