import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation detection", () => {
  it("should not throw when processing stack traces with long stack support enabled", () => {
    Q.longStackSupport = true;

    return new Promise<void>((resolve, reject) => {
      const deferred = Q.defer();

      deferred.promise
        .then(() => {
          throw new Error("test error");
        })
        .catch((err: Error) => {
          // If the mutation is present, makeStackTraceLong will throw
          // because getFileNameAndLineNumber tries to access null[1]
          // when attempt3 is null (non-Firefox stack line format)
          expect(err.message).toBe("test error");
          resolve();
        });

      deferred.resolve("value");
    }).finally(() => {
      Q.longStackSupport = false;
    });
  });
});