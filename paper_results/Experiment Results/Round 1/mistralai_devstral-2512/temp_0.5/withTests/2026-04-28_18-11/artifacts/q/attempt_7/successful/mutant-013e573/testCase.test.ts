const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.npost behavior with undefined args", () => {
  it("should handle undefined args correctly", async () => {
    const obj = {
      method: function (callback: (err: any, result?: any) => void) {
        // This method expects only a callback
        callback(null, "success");
      }
    };

    // Test with no args array (undefined)
    const result = await Q.npost(obj, "method", undefined);

    // The mutation would add "Stryker was here" to the args array
    // which would cause the method to receive an extra argument
    // Original: method receives only callback
    // Mutated: method receives ["Stryker was here"] + callback
    expect(result).toBe("success");
  });
});