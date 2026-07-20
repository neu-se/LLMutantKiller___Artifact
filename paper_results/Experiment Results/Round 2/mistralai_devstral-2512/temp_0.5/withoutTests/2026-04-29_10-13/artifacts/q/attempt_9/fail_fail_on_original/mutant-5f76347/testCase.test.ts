const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should pass the key to delete operation", () => {
    const testObj = { keyToDelete: "value" };
    const key = "keyToDelete";

    // Create a promise that tracks dispatch calls
    const dispatchCalls: any[] = [];
    const promise = Q(testObj);
    const originalDispatch = promise.dispatch;
    promise.dispatch = function(op: string, args: any[]) {
      dispatchCalls.push({ op, args });
      return originalDispatch.call(this, op, args);
    };

    // Call Q.delete
    Q.delete(testObj, key);

    // Verify the key was passed
    expect(dispatchCalls.length).toBe(1);
    expect(dispatchCalls[0].op).toBe("delete");
    expect(dispatchCalls[0].args).toEqual([key]);
  });
});