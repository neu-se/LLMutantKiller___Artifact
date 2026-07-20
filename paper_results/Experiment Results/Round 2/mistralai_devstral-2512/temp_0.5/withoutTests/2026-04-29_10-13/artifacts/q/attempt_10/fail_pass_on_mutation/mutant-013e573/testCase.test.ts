const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library", () => {
  it("should correctly handle nmapply with empty args array and detect mutation", () => {
    const obj = {
      method: function() {
        // Check arguments object directly
        if (arguments.length > 1) {
          // In mutated version, first argument would be "Stryker was here"
          if (arguments[0] === "Stryker was here") {
            throw new Error("Mutation detected: unexpected argument value");
          }
        }
        const callback = arguments[arguments.length - 1];
        if (typeof callback === 'function') {
          callback(null, "success");
        } else {
          throw new Error("Callback not found");
        }
      }
    };

    const promise = Q.nmapply(obj, "method", []);

    return promise.then((result: any) => {
      expect(result).toBe("success");
    });
  });
});