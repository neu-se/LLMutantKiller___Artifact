// Test case to detect the mutation in Q.del function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
  it("should correctly pass the key to delete operation", async () => {
    const obj = { a: 10, b: 20, c: 30 };
    const key = "b";

    // Create a wrapper to intercept the dispatch call
    const originalQ = Q;
    let capturedArgs: any = null;

    // Temporarily override Q to capture the dispatch arguments
    const testQ = function(value: any) {
      const promise = originalQ(value);
      const originalDispatch = promise.dispatch;
      promise.dispatch = function(op: string, args: any[]) {
        if (op === "delete") {
          capturedArgs = args;
        }
        return originalDispatch.call(this, op, args);
      };
      return promise;
    };

    await testQ(obj).del(key);

    // Verify the key was passed correctly
    expect(capturedArgs).toEqual([key]);
    expect(obj).not.toHaveProperty(key);
    expect(obj.a).toBe(10);
    expect(obj.c).toBe(30);
  });
});