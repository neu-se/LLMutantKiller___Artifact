const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should correctly pass the key argument to delete operation", () => {
    const testKey = "testKey";
    const obj = { [testKey]: "testValue" };
    const promise = Q(obj);

    // Intercept the dispatch call to verify arguments
    let capturedArgs: any[] = [];
    const originalDispatch = promise.dispatch;
    promise.dispatch = function(op: string, args: any[]) {
      capturedArgs = args;
      return originalDispatch.call(this, op, args);
    };

    // Perform the delete operation
    promise.del(testKey);

    // Verify the key was passed correctly
    expect(capturedArgs).toEqual([testKey]);
    expect(capturedArgs.length).toBe(1);
    expect(capturedArgs[0]).toBe(testKey);
  });
});