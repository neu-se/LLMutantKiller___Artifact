import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any progress notifications", () => {
  it("should send { index, value } progress updates when promises notify", (done) => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const progressValues: Array<{ index: number; value: string }> = [];

    Q.any([deferred1.promise, deferred2.promise])
      .then(
        function () {
          expect(progressValues.length).toBeGreaterThan(0);
          expect(progressValues[0]).toEqual({ index: 0, value: "progress-a" });
          done();
        },
        function (err: Error) {
          done(err);
        },
        function (progressValue: { index: number; value: string }) {
          progressValues.push(progressValue);
        }
      );

    // Emit a progress notification from the first promise
    deferred1.notify("progress-a");

    // Resolve the second promise to settle Q.any
    deferred2.resolve("done");
  });
});