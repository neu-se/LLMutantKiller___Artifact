import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise progress handling", () => {
  it("should handle progress notifications correctly when no error is thrown", () => {
    let progressValue: any = null;
    const deferred = Q.defer();

    const promise = deferred.promise.then(
      () => {},
      () => {},
      (value) => {
        progressValue = value;
      }
    );

    deferred.notify("test value");
    deferred.resolve("final value");

    return promise.then((result) => {
      expect(result).toBe("final value");
      expect(progressValue).toBe("test value");
    });
  });
});