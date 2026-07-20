const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nmapply", () => {
  it("should handle empty args array correctly", () => {
    const obj = {
      method: function(callback: (err: any, result?: any) => void) {
        // Check that no extra arguments are passed
        if (arguments.length > 1) {
          throw new Error(`Unexpected extra argument: ${arguments[1]}`);
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