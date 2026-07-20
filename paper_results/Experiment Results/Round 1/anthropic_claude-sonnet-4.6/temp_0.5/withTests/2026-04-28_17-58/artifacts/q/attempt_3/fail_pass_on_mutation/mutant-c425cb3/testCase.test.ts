import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification when progress callback throws", () => {
  it("should not notify the returned promise's progress listeners when the progress callback throws", (done) => {
    const def = Q.defer();

    Q.onerror = function () { /* swallow */ };

    const progressReceived: unknown[] = [];

    // thenPromise is the promise returned by .then()
    // Its progress listeners should NOT be called when the progress callback throws
    const thenPromise = def.promise.then(
      null,
      null,
      function (val: unknown) {
        // This progress callback throws
        throw new Error("progress error");
      }
    );

    // Listen for progress on the returned promise
    thenPromise.then(
      null,
      null,
      function (val: unknown) {
        progressReceived.push(val);
      }
    );

    def.notify("test");

    // Wait a bit then resolve and check
    setTimeout(function () {
      def.resolve();
      setTimeout(function () {
        // In original: progressReceived is empty (notify not called when threw)
        // In mutated: progressReceived has [undefined] (notify always called)
        expect(progressReceived).toEqual([]);
        Q.onerror = null;
        done();
      }, 50);
    }, 50);
  });
});