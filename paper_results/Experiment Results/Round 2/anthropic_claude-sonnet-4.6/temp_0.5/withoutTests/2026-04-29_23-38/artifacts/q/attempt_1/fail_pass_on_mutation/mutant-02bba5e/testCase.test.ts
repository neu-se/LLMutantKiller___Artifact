import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong with null error", () => {
  it("should handle null rejection reason without throwing", async () => {
    Q.longStackSupport = true;

    // Create a rejected promise with null as the reason
    const rejectedPromise = Q.reject(null);

    // When we chain .then() with a rejection handler, makeStackTraceLong
    // is called with the rejection reason (null) and the promise
    // Original code: error !== null is false, so block is skipped safely
    // Mutated code: true is used instead, so it tries to access null.stack
    // which would throw a TypeError
    
    let caughtError: any = null;
    let resolvedValue: any = undefined;

    await new Promise<void>((resolve) => {
      rejectedPromise.then(
        undefined,
        function(err) {
          resolvedValue = err;
          resolve();
        }
      ).fail(function(e: any) {
        caughtError = e;
        resolve();
      });
    });

    // In the original code, null rejection reason is passed through cleanly
    // In the mutated code, it should throw a TypeError when trying to access null properties
    expect(caughtError).toBeNull();
    expect(resolvedValue).toBeNull();
  });
});