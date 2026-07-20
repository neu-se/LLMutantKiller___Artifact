import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred.makeNodeResolver", () => {
  it("fulfills a promise with an array when called with multiple callback arguments", (done) => {
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