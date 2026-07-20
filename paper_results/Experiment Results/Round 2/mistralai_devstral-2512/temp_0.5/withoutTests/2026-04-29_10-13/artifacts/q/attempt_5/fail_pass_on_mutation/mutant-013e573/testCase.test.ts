const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library", () => {
  it("should correctly handle nmapply with empty args array and verify argument count", () => {
    const obj = {
      method: function(...args: any[]) {
        // The callback should be the only argument when args is empty
        if (args.length !== 1) {
          throw new Error(`Expected 1 argument (callback), got ${args.length}`);
        }
        const callback = args[0];
        callback(null, "success");
      }
    };

    const promise = Q.nmapply(obj, "method", []);

    return promise.then((result: any) => {
      expect(result).toBe("success");
    });
  });
});