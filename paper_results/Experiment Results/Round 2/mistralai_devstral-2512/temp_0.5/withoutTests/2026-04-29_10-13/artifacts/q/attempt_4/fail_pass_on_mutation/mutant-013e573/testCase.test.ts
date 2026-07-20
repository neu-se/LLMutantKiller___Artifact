const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library", () => {
  it("should correctly handle nmapply with empty args array", () => {
    const obj = {
      method: function(callback: (err: any, result?: any) => void) {
        callback(null, "success");
      }
    };

    const promise = Q.nmapply(obj, "method", []);

    return promise.then((result: any) => {
      expect(result).toBe("success");
    });
  });
});