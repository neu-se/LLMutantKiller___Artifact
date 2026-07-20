const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.npost behavior with undefined args", () => {
  it("should handle undefined args correctly", async () => {
    const obj = {
      method: function (a: any, b: any, callback: (err: any, result?: any) => void) {
        // Return the third argument if it exists (should be callback)
        callback(null, arguments[2] === callback ? "correct" : "extra_arg");
      }
    };

    // Test with undefined args - should work without adding extra elements
    const result = await Q.npost(obj, "method", [undefined, undefined]);

    // The mutation would add "Stryker was here" to the args array
    // which would shift the callback to position 3, making arguments[2] not equal to callback
    expect(result).toBe("correct");
  });
});