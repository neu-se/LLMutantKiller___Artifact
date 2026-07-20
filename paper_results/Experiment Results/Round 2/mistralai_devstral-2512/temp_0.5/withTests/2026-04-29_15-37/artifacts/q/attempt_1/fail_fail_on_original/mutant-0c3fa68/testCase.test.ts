import { Q } from "./q.js";

describe("Q.progress function", () => {
  it("should attach progress listener and notify with value", () => {
    const deferred = Q.defer();
    let progressValue: number | undefined;

    Q.progress(deferred.promise, (value: number) => {
      progressValue = value;
    });

    deferred.notify(42);
    deferred.resolve();

    return deferred.promise.then(() => {
      expect(progressValue).toBe(42);
    });
  });
});