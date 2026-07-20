import { Q } from "./q.js";

describe("Q.nmapply", () => {
  it("should handle empty args array correctly", () => {
    const obj = {
      method: function(arg1, callback) {
        callback(null, arg1);
      }
    };

    // Test with empty args array
    return Q.nmapply(obj, "method", []).then(result => {
      expect(result).toBeUndefined();
    });
  });
});