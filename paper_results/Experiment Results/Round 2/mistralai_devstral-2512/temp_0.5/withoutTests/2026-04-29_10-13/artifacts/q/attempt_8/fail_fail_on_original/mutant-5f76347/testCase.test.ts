const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the key to delete operation", () => {
    const testObj = { keyToDelete: "value" };
    const key = "keyToDelete";

    // Track the arguments passed to dispatch
    let capturedArgs: any = null;
    const originalDispatch = Q(testObj).dispatch;
    Q(testObj).dispatch = function(op: string, args: any[]) {
      capturedArgs = args;
      return originalDispatch.call(this, op, args);
    };

    // Call Q.delete
    Q.delete(testObj, key);

    // Verify the key was passed correctly
    expect(capturedArgs).toEqual([key]);
  });
});