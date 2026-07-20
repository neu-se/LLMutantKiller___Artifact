import { Q } from "./q";

describe("Q promise library", () => {
  it("should correctly handle nmapply with empty args array", () => {
    const obj = {
      method: function(arg1, callback) {
        callback(null, "success");
      }
    };

    const promise = Q.nmapply(obj, "method", []);

    return promise.then(result => {
      expect(result).toBe("success");
    });
  });
});