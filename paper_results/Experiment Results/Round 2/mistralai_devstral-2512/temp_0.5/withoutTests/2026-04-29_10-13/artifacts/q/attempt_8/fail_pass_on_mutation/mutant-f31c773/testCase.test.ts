const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should correctly handle setting a property and verify the dispatch arguments", () => {
    const obj = { testProp: "initial" };
    const promise = Q(obj);

    // Override dispatch to capture arguments
    const originalDispatch = promise.dispatch;
    let capturedArgs: any = null;
    promise.dispatch = function(op: string, args: any[]) {
      capturedArgs = args;
      return originalDispatch.call(this, op, args);
    };

    return promise.set("testProp", "updatedValue").then(() => {
      // Verify the arguments passed to dispatch
      expect(capturedArgs).toEqual(["testProp", "updatedValue"]);
      expect(obj.testProp).toBe("updatedValue");
    });
  });
});