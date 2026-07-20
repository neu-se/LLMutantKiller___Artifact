import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation when handler throws", () => {
  it("should not call downstream progress handler when upstream progress handler throws", (done) => {
    const deferred = Q.defer();
    const downstreamProgressValues: any[] = [];

    // Set up Q.onerror to swallow errors from progress handlers
    const originalOnerror = (Q as any).onerror;
    (Q as any).onerror = function () {
      // swallow the error
    };

    deferred.promise
      .then(
        null,
        null,
        function (value: any) {
          // This progress handler throws an exception
          throw new Error("progress handler error");
        }
      )
      .then(
        null,
        null,
        function (value: any) {
          // This downstream handler should NOT be called when the upstream throws
          downstreamProgressValues.push(value);
        }
      );

    // Send a progress notification
    deferred.notify("test-progress");

    // After a tick, check that downstream was not notified
    setTimeout(function () {
      (Q as any).onerror = originalOnerror;
      try {
        // In original code: threw=true so notify is skipped, downstreamProgressValues is empty
        // In mutated code: always notifies, so downstreamProgressValues has one entry (undefined)
        expect(downstreamProgressValues.length).toBe(0);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });
});