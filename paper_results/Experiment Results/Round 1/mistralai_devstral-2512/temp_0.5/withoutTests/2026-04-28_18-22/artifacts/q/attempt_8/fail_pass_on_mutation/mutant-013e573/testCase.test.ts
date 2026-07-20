const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nmapply", () => {
  it("should handle empty args array correctly", () => {
    const obj = {
      method: function(callback: (err: any, result?: any) => void) {
        // Check that the first argument is not "Stryker was here"
        if (arguments[0] === "Stryker was here") {
          throw new Error("Unexpected argument: Stryker was here");
        }
        callback(null, "success");
      }
    };

    // Test with empty args array - should pass with original code, fail with mutated code
    return Q.nmapply(obj, "method", []).then((result: any) => {
      expect(result).toBe("success");
    });
  });
});