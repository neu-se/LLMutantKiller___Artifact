import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q uses setImmediate not process.nextTick in Node.js", () => {
  it("setTimeout(fn,0) should complete before Q resolves a deferred when using setImmediate", (done) => {
    const order: string[] = [];

    const deferred = Q.defer();
    deferred.promise.then(() => {
      order.push("Q");
      expect(order).toEqual(["setTimeout", "Q"]);
      done();
    });

    setTimeout(() => {
      order.push("setTimeout");
      deferred.resolve(null);
    }, 0);
  });
});