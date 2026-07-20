import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong null error handling", () => {
  it("should not throw when rejection reason is null and longStackSupport is disabled", () => {
    Q.longStackSupport = false;

    const deferred = Q.defer();
    deferred.reject(null);

    return deferred.promise.then(
      () => {
        throw new Error("Should not fulfill");
      },
      (reason: unknown) => {
        expect(reason).toBeNull();
      }
    ).then(
      () => {
        // chain another rejection handler to trigger makeStackTraceLong again
      },
      (reason: unknown) => {
        expect(reason).toBeNull();
      }
    );
  });
});