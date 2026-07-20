import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q coerce error handling", () => {
  it("should reject the promise when a thenable's then method throws an exception", async () => {
    // Create a thenable whose .then method throws an error
    const throwingThenable = {
      then: function() {
        throw new Error("thenable then threw");
      }
    };

    // Q will call coerce() on this thenable since it has a .then method
    const promise = Q(throwingThenable);

    // In the original code, the catch block calls deferred.reject(exception),
    // so the promise should be rejected with the thrown error.
    // In the mutated code, the catch block is empty, so the promise stays pending forever.
    
    let rejectedReason: Error | null = null;
    let fulfilled = false;
    let rejected = false;

    await new Promise<void>((resolve) => {
      promise.then(
        () => {
          fulfilled = true;
          resolve();
        },
        (err: Error) => {
          rejected = true;
          rejectedReason = err;
          resolve();
        }
      );

      // Set a timeout to resolve if neither callback is called (mutant case - stays pending)
      setTimeout(resolve, 500);
    });

    // Original: should be rejected
    // Mutant: stays pending (neither fulfilled nor rejected)
    expect(rejected).toBe(true);
    expect(fulfilled).toBe(false);
    expect(rejectedReason).not.toBeNull();
    expect((rejectedReason as Error).message).toBe("thenable then threw");
  });
});