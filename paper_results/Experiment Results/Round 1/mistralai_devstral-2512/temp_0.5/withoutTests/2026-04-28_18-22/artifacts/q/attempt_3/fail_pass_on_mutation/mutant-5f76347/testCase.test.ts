const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the key to the delete operation", async () => {
    const obj = { testKey: "testValue" };
    const promise = Q(obj);

    // Create a mock dispatch to verify the arguments
    const originalDispatch = promise.dispatch;
    let capturedArgs: any = null;
    promise.dispatch = function(op: string, args: any[]) {
      capturedArgs = args;
      return originalDispatch.apply(this, arguments);
    };

    await promise.del("testKey");

    // Verify that dispatch was called with the correct key
    expect(capturedArgs).toEqual(["testKey"]);
  });
});