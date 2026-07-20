import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
  it("should set error stack to a non-undefined string when long stack support processes a rejection", async () => {
    Q.longStackSupport = true;

    let capturedStack: any = "NOT_SET";

    await new Promise<void>((resolve) => {
      // Create a deferred promise chain to ensure promise.source is set (needed for makeStackTraceLong)
      const deferred = Q.defer();

      deferred.promise
        .then(function () {
          // This creates a source link in the promise chain
          throw new Error("inner error");
        })
        .then(null, function (err: Error) {
          capturedStack = err.stack;
          resolve();
        });

      deferred.resolve("start");
    });

    // With original code: filterStackString returns a filtered string (possibly with "From previous event:" separator)
    // With mutated code: filterStackString returns undefined, so stack is undefined
    expect(capturedStack).toBeDefined();
    expect(typeof capturedStack).toBe("string");
    // The original filterStackString joins lines with "\n", so it returns a string
    // The mutated version returns undefined
    expect(capturedStack).not.toBeUndefined();
  });
});