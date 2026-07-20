const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the key to delete operation", async () => {
    const testObj = { keyToDelete: "value" };
    const key = "keyToDelete";

    // Create a promise that tracks dispatch calls
    let dispatchArgs: any = null;
    const promise = Q(testObj);
    const originalDispatch = promise.dispatch;
    promise.dispatch = function(op: string, args: any[]) {
      dispatchArgs = args;
      return originalDispatch.call(this, op, args);
    };

    // Call Q.delete
    await Q.delete(testObj, key);

    // Verify the key was passed
    expect(dispatchArgs).toEqual([key]);
  });
});