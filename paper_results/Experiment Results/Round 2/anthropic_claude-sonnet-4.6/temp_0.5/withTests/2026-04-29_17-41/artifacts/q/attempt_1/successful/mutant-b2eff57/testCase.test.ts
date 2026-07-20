import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any rejects with falsy error values", () => {
  it("should reject with a proper Error object when all promises reject with null", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const promise = Q.any([deferred1.promise, deferred2.promise]);

    deferred1.reject(null);
    deferred2.reject(null);

    return Q.delay(250).then(() => {
      expect(promise.isRejected()).toBe(true);
      const reason = promise.inspect().reason;
      expect(reason).toBeInstanceOf(Error);
      expect(reason.message).toContain("Q can't get fulfillment value from any promise");
    });
  });
});