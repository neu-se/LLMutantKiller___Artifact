const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.npost behavior with undefined args", () => {
  it("should handle undefined args correctly", async () => {
    const obj = {
      method: function (a: any, b: any, callback: (err: any, result?: any) => void) {
        // Count the number of arguments received
        const argCount = arguments.length;
        callback(null, argCount);
      }
    };

    // Test with undefined args - should work without adding extra elements
    const result = await Q.npost(obj, "method", [undefined, undefined]);

    // The mutation would add "Stryker was here" to the args array
    // which would cause the method to receive 3 arguments instead of 2
    // (plus the callback makes 3 total in original, 4 in mutated)
    expect(result).toBe(3); // 2 args + callback = 3 total arguments
  });
});