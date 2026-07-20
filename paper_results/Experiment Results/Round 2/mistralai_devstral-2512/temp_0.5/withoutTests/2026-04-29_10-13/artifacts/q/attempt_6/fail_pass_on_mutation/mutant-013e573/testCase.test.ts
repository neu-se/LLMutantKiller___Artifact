const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise library", () => {
  it("should correctly handle nmapply with empty args array and verify no extra arguments", () => {
    const obj = {
      method: function(...args: any[]) {
        // Check that we only received the callback (1 argument)
        // The mutation would add "Stryker was here" as an extra argument
        if (args.length !== 1) {
          throw new Error(`Expected exactly 1 argument (callback), got ${args.length}: ${JSON.stringify(args)}`);
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