import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise progress handling", () => {
  it("should call Q.onerror when an error is thrown in progress handler", (done) => {
    let onerrorCalled = false;
    const originalOnerror = Q.onerror;

    Q.onerror = function(e: Error) {
      onerrorCalled = true;
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe("test error");
    };

    const deferred = Q.defer();
    const promise = deferred.promise;

    promise.then(
      () => {},
      () => {},
      () => {
        throw new Error("test error");
      }
    );

    deferred.notify("progress");

    setTimeout(() => {
      Q.onerror = originalOnerror;
      expect(onerrorCalled).toBe(true);
      done();
    }, 10);
  });
});