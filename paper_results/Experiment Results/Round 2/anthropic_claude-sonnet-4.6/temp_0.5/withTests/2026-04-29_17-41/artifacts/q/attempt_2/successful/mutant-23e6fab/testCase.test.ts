import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace rejection handling", () => {
  it("should successfully handle a rejected promise with long stack support enabled", async () => {
    Q.longStackSupport = true;

    try {
      const deferred = Q.defer();

      const promise = deferred.promise.then(() => {
        throw new Error("inner error");
      });

      deferred.resolve(undefined);

      const value = await promise.then(
        () => "fulfilled",
        () => "rejected"
      );

      expect(value).toBe("rejected");
    } finally {
      Q.longStackSupport = false;
    }
  });
});