// Test case to detect mutation in Q.mapply
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.mapply mutation detection", () => {
  it("should correctly dispatch 'post' operation with method name and args", async () => {
    // Create a test object with a method
    const testObject = {
      testMethod: function(arg1: number, arg2: number) {
        return arg1 + arg2;
      }
    };

    // Use Q.mapply to call the method
    const result = await Q.mapply(testObject, "testMethod", [3, 5]);

    // The result should be the sum of the arguments (3 + 5 = 8)
    expect(result).toBe(8);
  });
});