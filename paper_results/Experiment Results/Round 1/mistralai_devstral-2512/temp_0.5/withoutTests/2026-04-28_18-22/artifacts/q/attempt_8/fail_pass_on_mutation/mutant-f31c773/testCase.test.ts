const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should correctly set property and verify dispatch parameters", async () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);

    // Mock the dispatch to verify parameters
    const dispatchCalls: any[] = [];
    const originalDispatch = promise.dispatch;
    promise.dispatch = function(op: string, args: any[]) {
      dispatchCalls.push({ op, args });
      return originalDispatch.call(this, op, args);
    };

    await promise.set("prop", "updated");

    // Verify dispatch was called with correct parameters
    expect(dispatchCalls.length).toBe(1);
    expect(dispatchCalls[0].op).toBe("set");
    expect(dispatchCalls[0].args).toEqual(["prop", "updated"]);
    expect(obj.prop).toBe("updated");
  });
});