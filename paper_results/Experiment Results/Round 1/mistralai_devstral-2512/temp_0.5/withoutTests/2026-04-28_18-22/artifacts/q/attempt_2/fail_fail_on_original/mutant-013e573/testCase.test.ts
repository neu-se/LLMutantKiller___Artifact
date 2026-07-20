import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nmapply", () => {
  it("should handle empty args array correctly", () => {
    const obj = {
      method: function(arg1: any, callback: (err: any, result?: any) => void) {
        callback(null, arg1);
      }
    };

    // Test with empty args array - should pass with original code, fail with mutated code
    return Q.nmapply(obj, "method", []).then((result: any) => {
      expect(result).toBeUndefined();
    });
  });
});