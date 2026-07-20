const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.npost behavior with undefined args", () => {
  it("should handle undefined args correctly", async () => {
    const obj = {
      method: function (a: any, b: any, callback: (err: any, result?: any) => void) {
        // Return all arguments as an array to detect extra arguments
        const args = Array.prototype.slice.call(arguments);
        callback(null, args.length);
      }
    };

    // Test with undefined args - should work without adding extra elements
    const result = await Q.npost(obj, "method", [undefined, undefined]);

    // The mutation would add "Stryker was here" to the args array
    // which would cause the method to receive an extra argument
    // Original: 3 arguments (2 from array + callback)
    // Mutated: 4 arguments (2 from array + "Stryker was here" + callback)
    expect(result).toBe(3);
  });
});