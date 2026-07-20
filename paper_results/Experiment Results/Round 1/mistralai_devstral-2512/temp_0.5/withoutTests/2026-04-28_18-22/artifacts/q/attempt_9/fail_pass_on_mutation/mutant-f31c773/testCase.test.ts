const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should fail when dispatch receives empty array instead of key-value pair", async () => {
    const obj = { prop: "initial" };
    const promise = Q(obj);

    // Override dispatch to throw error if called with empty array
    const originalDispatch = promise.dispatch;
    promise.dispatch = function(op: string, args: any[]) {
      if (op === "set" && args.length === 0) {
        throw new Error("Dispatch called with empty array for set operation");
      }
      return originalDispatch.call(this, op, args);
    };

    // This should pass in original (correct args) but fail in mutated (empty array)
    await promise.set("prop", "updated");
    expect(obj.prop).toBe("updated");
  });
});