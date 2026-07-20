import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred.makeNodeResolver", () => {
  it("rejects a promise when the callback is called with an error", async () => {
    const deferred = Q.defer();
    const callback = deferred.makeNodeResolver();
    const exception = new Error("Holy Exception of Antioch");
    callback(exception);

    let rejectedWith: Error | null = null;
    let resolved = false;

    await deferred.promise.then(
      () => {
        resolved = true;
      },
      (err: Error) => {
        rejectedWith = err;
      }
    );

    expect(resolved).toBe(false);
    expect(rejectedWith).toBe(exception);
  });
});