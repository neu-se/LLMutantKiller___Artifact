const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the correct key to the delete operation", () => {
    const obj = { key1: "value1", key2: "value2" };
    const promise = Q(obj);

    // Override dispatch to capture the arguments
    const originalDispatch = promise.dispatch;
    let capturedOp: string | null = null;
    let capturedArgs: any[] | null = null;

    promise.dispatch = function(op: string, args: any[]) {
      capturedOp = op;
      capturedArgs = args;
      return originalDispatch.call(this, op, args);
    };

    // Perform delete operation
    promise.del("key1");

    // Verify the correct arguments were passed to dispatch
    expect(capturedOp).toBe("delete");
    expect(capturedArgs).toEqual(["key1"]);
  });
});