import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification test", () => {
  it("should call progress listeners when notify is called with a value", () => {
    const deferred = Q.defer();
    let progressValue: any = null;

    const promise = Q.when(
      deferred.promise,
      () => {
        // Fulfillment callback
      },
      () => {
        // Rejection callback
      },
      (value: any) => {
        progressValue = value;
      }
    );

    deferred.notify("test-progress");
    deferred.resolve("resolved");

    return promise.then(() => {
      expect(progressValue).toBe("test-progress");
    });
  });
});