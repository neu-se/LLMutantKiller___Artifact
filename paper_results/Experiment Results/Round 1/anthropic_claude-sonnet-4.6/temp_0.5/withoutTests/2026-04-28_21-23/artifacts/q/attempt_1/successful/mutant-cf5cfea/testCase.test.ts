import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q coerce error handling", () => {
  it("should reject the promise when a thenable throws in its then method", async () => {
    const error = new Error("thenable error");
    
    // Create a thenable that throws when .then() is called
    const badThenable = {
      then: function() {
        throw error;
      }
    };
    
    // Q should coerce the thenable and reject with the thrown error
    const promise = Q(badThenable);
    
    let caughtReason: any = null;
    let fulfilled = false;
    
    await new Promise<void>((resolve) => {
      promise.then(
        function() {
          fulfilled = true;
          resolve();
        },
        function(reason: any) {
          caughtReason = reason;
          resolve();
        }
      );
    });
    
    expect(fulfilled).toBe(false);
    expect(caughtReason).toBe(error);
  });
});