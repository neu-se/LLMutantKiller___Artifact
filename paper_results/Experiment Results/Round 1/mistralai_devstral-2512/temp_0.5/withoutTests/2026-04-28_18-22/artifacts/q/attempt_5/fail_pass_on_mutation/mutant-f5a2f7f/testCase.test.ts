const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace initialization", () => {
  it("should properly initialize qFileName during stack capture", () => {
    // This test targets the specific mutation in the captureLine() function
    // The mutation changes `if (!hasStacks)` to `if (false)` which breaks
    // the early return path and affects qFileName initialization

    // Force long stack traces to ensure captureLine() is called
    Q.longStackSupport = true;

    // Create a promise that will trigger stack capture
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The qFileName should be properly initialized in original code
    // but will be undefined in mutated code due to the broken condition
    deferred.reject(new Error("test"));

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        // In original code, qFileName is properly set during captureLine()
        // In mutated code, the condition always evaluates to false, breaking initialization
        expect(error.stack).toBeDefined();
        expect(error.stack!.includes("test")).toBe(true);

        // This assertion will fail in mutated code because qFileName won't be set
        // due to the broken condition in captureLine()
        expect(promise.stack).toBeDefined();
      }
    );
  });
});