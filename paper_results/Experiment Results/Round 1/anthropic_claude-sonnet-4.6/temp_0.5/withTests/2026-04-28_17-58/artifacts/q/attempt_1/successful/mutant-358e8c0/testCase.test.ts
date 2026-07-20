import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all mutation detection", () => {
  it("should reject when one of the promises in Q.all is rejected", () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const allPromise = Q.all([deferred1.promise, deferred2.promise]);

    deferred1.resolve(1);
    deferred2.reject(new Error("Rejected!"));

    return allPromise.then(
      function () {
        throw new Error("Expected Q.all to reject, but it fulfilled");
      },
      function (reason: Error) {
        expect(reason.message).toBe("Rejected!");
      }
    );
  });
});