const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nmapply", () => {
  it("should handle empty args array correctly", () => {
    const obj = {
      method: function(callback: (err: any, result?: any) => void) {
        // Check that the callback is the only argument and it's a function
        if (arguments.length !== 1 || typeof arguments[0] !== 'function') {
          throw new Error(`Expected exactly one function argument, got ${arguments.length} arguments`);
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