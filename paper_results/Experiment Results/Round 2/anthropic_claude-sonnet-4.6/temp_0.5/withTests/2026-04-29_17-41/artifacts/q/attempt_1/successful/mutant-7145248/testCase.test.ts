import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeNodeResolver with multiple callback arguments", () => {
  it("fulfills a promise with an array when callback is called with multiple success values", (done) => {
    const deferred = Q.defer();
    const callback = deferred.makeNodeResolver();
    callback(null, 10, 20);
    deferred.promise.then(
      (value: unknown) => {
        expect(value).toEqual([10, 20]);
        done();
      },
      (err: unknown) => {
        done(new Error("Promise was rejected unexpectedly: " + err));
      }
    );
  });
});