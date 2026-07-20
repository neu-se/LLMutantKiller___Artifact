// Test case to detect the mutation in Q.del function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
  it("should pass the key argument to dispatch when deleting", async () => {
    const obj = { a: 10, b: 20 };
    const key = "a";

    // Mock the dispatch method to capture arguments
    const originalDispatch = Q(obj).dispatch;
    let dispatchCalledWith: any[] = [];
    Q(obj).dispatch = function(op: string, args: any[]) {
      dispatchCalledWith = [op, args];
      return originalDispatch.call(this, op, args);
    };

    await Q(obj).del(key);

    // Verify dispatch was called with correct arguments
    expect(dispatchCalledWith[0]).toBe("delete");
    expect(dispatchCalledWith[1]).toEqual([key]);
    expect(obj).not.toHaveProperty(key);
  });
});