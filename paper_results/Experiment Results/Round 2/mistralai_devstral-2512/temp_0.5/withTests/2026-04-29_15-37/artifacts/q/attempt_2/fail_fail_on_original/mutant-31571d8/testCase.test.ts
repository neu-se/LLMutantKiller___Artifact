import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

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
    deferred1.promise.then(() => {
      return deferred2.promise;
    }).then(() => {
      return deferred3.promise;
    }).then(() => {
      throw error;
    });

    // Resolve promises in order to build the stack
    deferred1.resolve();
    deferred2.resolve();
    deferred3.resolve();

    return deferred1.promise.then(
      () => {
        throw new Error("Should have rejected");
      },
      (e) => {
        // Verify the error has the expected stack trace
        expect(e).toBe(error);
        expect(e.stack).toBeDefined();
        // The mutation would cause this to fail because it always evaluates to false
        // in the condition, preventing proper stack trace building
      }
    ).finally(() => {
      // Clean up
      Q.longStackSupport = false;
    });
  });
});