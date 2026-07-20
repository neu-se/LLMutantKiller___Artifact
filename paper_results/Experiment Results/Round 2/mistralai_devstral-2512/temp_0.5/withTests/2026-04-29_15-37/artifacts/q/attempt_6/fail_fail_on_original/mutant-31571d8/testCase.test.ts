const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack traces mutation test", () => {
  it("should correctly handle stack counter comparison in long stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises to build up a stack
    const error = new Error("Test error");
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const deferred3 = Q.defer();

    // Set up the stack counter to ensure the mutation affects behavior
    (error as any).__minimumStackCounter__ = 1;

    // Create a promise chain with multiple levels
    let promise = deferred1.promise;
    promise = promise.then(() => deferred2.promise);
    promise = promise.then(() => deferred3.promise);
    promise = promise.then(() => { throw error; });

    // Resolve promises in order to build the stack
    deferred1.resolve();
    deferred2.resolve();
    deferred3.resolve();

    return promise.then(
      () => {
        throw new Error("Should have rejected");
      },
      (e: any) => {
        // Verify the error has the expected stack trace
        expect(e).toBe(error);
        expect(e.stack).toBeDefined();
        // Check that the stack trace contains the expected pattern
        // The mutation would prevent proper stack trace building
        expect(e.stack).toMatch(/From previous event/);
      }
    ).finally(() => {
      // Clean up
      Q.longStackSupport = false;
    });
  });
});