import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should produce a non-undefined string stack trace when longStackSupport is enabled", () => {
    Q.longStackSupport = true;

    let capturedError: any = null;

    const deferred = Q.defer();

    const promise = deferred.promise.then(null, function (err: any) {
      capturedError = err;
    });

    const error = new Error("test error for stack filtering");
    deferred.reject(error);

    return promise.then(function () {
      Q.longStackSupport = false;
      expect(capturedError).not.toBeNull();
      // With the original code, filterStackString returns a joined string (possibly empty string "")
      // With the mutated code, filterStackString returns undefined, so error.stack becomes undefined
      expect(typeof capturedError.stack).toBe("string");
    });
  });
});