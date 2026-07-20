import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress notification", () => {
  it("should correctly handle progress notifications with valid operation name", async () => {
    let progressValue: number | undefined;
    const deferred = Q.defer();

    const promise = deferred.promise.then(
      () => {
        expect(progressValue).toBe(42);
      },
      () => {
        throw new Error("Promise should not be rejected");
      },
      (value: number) => {
        progressValue = value;
      }
    );

    deferred.notify(42);
    deferred.resolve(10);

    await promise;
  });
});