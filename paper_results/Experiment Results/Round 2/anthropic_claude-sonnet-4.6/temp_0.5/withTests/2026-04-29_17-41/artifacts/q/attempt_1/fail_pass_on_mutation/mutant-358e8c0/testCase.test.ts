import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all mutation detection", () => {
  it("should reject when one of the promises is rejected, not resolve with undefined", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    const allPromise = Q.all([deferred1.promise, deferred2.promise]);

    deferred1.resolve(1);
    deferred2.reject(new Error("rejected!"));

    let rejected = false;
    let resolvedValue: unknown = undefined;

    await allPromise.then(
      (value: unknown) => {
        resolvedValue = value;
      },
      () => {
        rejected = true;
      }
    );

    expect(rejected).toBe(true);
    expect(resolvedValue).toBeUndefined();
  });
});