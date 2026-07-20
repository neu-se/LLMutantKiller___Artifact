const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library", () => {
  it("should correctly handle nmapply with empty args array and detect mutation", () => {
    const obj = {
      method: function(arg1: any, arg2: any, callback: (err: any, result?: any) => void) {
        // In the mutated version, arg1 would be "Stryker was here"
        // In the original version, arg1 would be undefined
        if (arg1 === "Stryker was here") {
          throw new Error("Mutation detected: unexpected argument value");
        }
        callback(null, "success");
      }
    };

    const promise = Q.nmapply(obj, "method", []);

    return promise.then((result: any) => {
      expect(result).toBe("success");
    });
  });
});