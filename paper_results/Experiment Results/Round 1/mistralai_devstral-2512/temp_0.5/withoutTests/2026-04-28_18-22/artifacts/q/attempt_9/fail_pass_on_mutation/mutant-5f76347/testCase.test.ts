const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the key as first argument to delete operation", () => {
    const obj = { testKey: "testValue" };
    const promise = Q(obj);

    // Intercept dispatch to verify exact arguments
    let capturedArgs: any[] = [];
    const originalDispatch = promise.dispatch;
    promise.dispatch = function(op: string, args: any[]) {
      capturedArgs = args;
      return originalDispatch.call(this, op, args);
    };

    // Perform delete operation
    promise.del("testKey");

    // Verify the arguments array contains exactly the key
    expect(capturedArgs).toEqual(["testKey"]);
    expect(capturedArgs[0]).toBe("testKey");
    expect(capturedArgs.length).toBe(1);
  });
});