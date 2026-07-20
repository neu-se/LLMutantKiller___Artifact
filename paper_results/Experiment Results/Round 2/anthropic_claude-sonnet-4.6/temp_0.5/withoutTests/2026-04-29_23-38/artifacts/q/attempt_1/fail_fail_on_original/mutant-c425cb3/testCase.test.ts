import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation when handler throws", () => {
  it("should not propagate progress notification when the progress handler throws", (done) => {
    const deferred = Q.defer();
    const downstreamProgressValues: any[] = [];

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
      try {
        expect(downstreamProgressValues.length).toBe(0);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });
});