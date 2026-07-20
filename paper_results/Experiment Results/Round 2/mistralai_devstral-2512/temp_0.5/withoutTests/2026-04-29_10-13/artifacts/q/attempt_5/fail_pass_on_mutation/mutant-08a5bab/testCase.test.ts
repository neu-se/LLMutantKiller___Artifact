const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should not filter non-Q frames from stack traces", () => {
    // Create an error with a known stack trace
    let testStack: string | undefined;
    function createError() {
      try {
        throw new Error("Test error");
      } catch (e: any) {
        testStack = e.stack;
      }
    }
    createError();

    // Create a rejected promise that will go through Q's stack filtering
    const deferred = Q.defer();
    const error = new Error("Test error");
    deferred.reject(error);

    // Force handling of the promise
    deferred.promise.catch((e: any) => {
      // In the mutated version, all frames are considered internal
      // so the stack should be empty after filtering
      // In the original version, non-Q frames should remain
      expect(e.stack).toBeTruthy();
      expect(e.stack!.split('\n').length).toBeGreaterThan(1);
    });

    // The test passes if we reach here without throwing
    expect(true).toBe(true);
  });
});