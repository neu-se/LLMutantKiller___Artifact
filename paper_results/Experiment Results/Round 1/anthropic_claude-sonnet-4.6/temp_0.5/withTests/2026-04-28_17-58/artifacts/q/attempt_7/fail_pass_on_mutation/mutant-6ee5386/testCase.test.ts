import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer observers called even after throw", () => {
  it("second observer receives value even when first observer throws", (done) => {
    const deferred = Q.defer();
    let secondCalled = false;
    let receivedValue: any = null;

    // First observer throws
    Q.when(deferred.promise, function() {
      throw new Error("first observer throws");
    });

    // Second observer should still be called
    Q.when(deferred.promise, function(value: any) {
      secondCalled = true;
      receivedValue = value;
    }, function() {
      done(new Error("second observer should not be rejected"));
    });

    deferred.resolve(42);

    setTimeout(function() {
      expect(secondCalled).toBe(true);
      expect(receivedValue).toBe(42);
      done();
    }, 200);
  });
});