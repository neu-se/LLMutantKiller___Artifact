const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("npost method", () => {
  it("should correctly handle undefined args parameter", () => {
    const obj = {
      method: function (callback: (error: Error | null, result?: string) => void) {
        callback(null, "success");
      }
    };

    return Q.npost(obj, "method", undefined).then((result: string) => {
      expect(result).toBe("success");
    });
  });
});