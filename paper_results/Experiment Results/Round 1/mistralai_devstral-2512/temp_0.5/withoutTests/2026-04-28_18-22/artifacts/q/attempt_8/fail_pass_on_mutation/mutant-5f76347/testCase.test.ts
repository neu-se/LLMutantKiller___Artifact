const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the key to the delete operation", () => {
    const obj = { testKey: "testValue" };
    const promise = Q(obj);

    // Track the arguments passed to dispatch
    let dispatchArgs: any[] = [];
    const originalDispatch = promise.dispatch;
    promise.dispatch = function(op: string, args: any[]) {
      dispatchArgs = args;
      return originalDispatch.call(this, op, args);
    };

    // Perform delete operation
    promise.del("testKey");

    // Verify the key was passed in the arguments array
    expect(dispatchArgs).toContain("testKey");
    expect(dispatchArgs.length).toBeGreaterThan(0);
  });
});