const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should correctly pass the key to delete operation", async () => {
    const testObj = { testKey: "testValue" };
    const key = "testKey";

    // Track the arguments passed to dispatch
    let capturedArgs: any = null;
    const originalDispatch = Q(testObj).dispatch;
    Q(testObj).dispatch = function(op: string, args: any[]) {
      capturedArgs = args;
      return originalDispatch.call(this, op, args);
    };

    // Call Q.delete
    const result = Q.delete(testObj, key);

    // Wait for the promise to settle
    await result;

    // Verify the key was passed correctly
    expect(capturedArgs).toEqual([key]);
  });
});