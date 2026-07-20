const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library", () => {
  it("should correctly handle nmapply with empty args array and verify exact argument structure", () => {
    const obj = {
      method: function(...args: any[]) {
        // The mutation would add "Stryker was here" as the first argument
        // when args is empty, making args.length = 2 instead of 1
        if (args.length !== 1) {
          throw new Error(`Expected exactly 1 argument (callback), got ${args.length}: ${JSON.stringify(args)}`);
        }
        if (typeof args[0] !== 'function') {
          throw new Error(`Expected first argument to be a function, got ${typeof args[0]}`);
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