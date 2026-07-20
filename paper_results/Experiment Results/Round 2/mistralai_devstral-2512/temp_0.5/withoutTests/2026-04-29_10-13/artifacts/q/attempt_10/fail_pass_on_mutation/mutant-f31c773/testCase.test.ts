const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should pass correct arguments to dispatch when setting property", () => {
    const testObj = { prop: "initial" };
    const promise = Q(testObj);

    // Intercept the dispatch call to verify arguments
    const originalDispatch = promise.dispatch;
    let dispatchCalledWith: any = null;
    promise.dispatch = function(op: string, args: any[]) {
      dispatchCalledWith = { op, args };
      return originalDispatch.call(this, op, args);
    };

    return promise.set("prop", "updated").then(() => {
      // Verify dispatch was called with correct arguments
      expect(dispatchCalledWith).not.toBeNull();
      expect(dispatchCalledWith.op).toBe("set");
      expect(dispatchCalledWith.args).toEqual(["prop", "updated"]);
      expect(testObj.prop).toBe("updated");
    });
  });
});