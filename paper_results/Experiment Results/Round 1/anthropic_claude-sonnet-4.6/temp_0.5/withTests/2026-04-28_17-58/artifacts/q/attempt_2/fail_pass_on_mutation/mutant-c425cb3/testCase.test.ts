import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress propagation when progress callback throws", () => {
  it("should not call downstream progress listener when the progress callback throws", (done) => {
    const def = Q.defer();

    // Suppress Q.onerror for the thrown error
    Q.onerror = function () { /* swallow */ };

    const downstreamProgressValues: unknown[] = [];

    // Chain: def.promise -> progress callback that throws -> downstream progress listener
    const p2 = def.promise.then(
      function () {
        // fulfilled: verify downstream progress was NOT notified
        expect(downstreamProgressValues).toEqual([]);
        Q.onerror = null;
        done();
      },
      function (err: unknown) {
        Q.onerror = null;
        done(new Error("unexpected rejection: " + err));
      },
      function (progressValue: unknown) {
        // This progress callback throws
        throw new Error("progress callback error");
      }
    );

    // Attach a second downstream listener on p2
    p2.then(
      null,
      null,
      function (progressValue: unknown) {
        downstreamProgressValues.push(progressValue);
      }
    );

    def.notify("ping");
    def.resolve();
  });
});