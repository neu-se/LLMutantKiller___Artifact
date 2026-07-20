// Test case to detect the mutation in Q.del function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
  it("should pass the correct key to the delete operation", async () => {
    const obj = { a: 10, b: 20 };
    const key = "a";

    // Spy on the dispatch method to verify the key is passed correctly
    const originalDispatch = Q(obj).dispatch;
    let capturedArgs = null;
    Q(obj).dispatch = function(op, args) {
      capturedArgs = args;
      return originalDispatch.call(this, op, args);
    };

    await Q(obj).del(key);

    // Verify the key was passed in the arguments array
    expect(capturedArgs).toEqual([key]);
    expect(obj).not.toHaveProperty(key);
  });
});