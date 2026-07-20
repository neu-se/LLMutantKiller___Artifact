import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty usage in makeStackTraceLong", () => {
  it("should properly set the stack property on errors when long stack support is enabled", async () => {
    Q.longStackSupport = true;

    try {
      const result = await new Promise<string>((resolve, reject) => {
        function level1() {
          return Q().then(function level1Handler() {
            return level2();
          });
        }

        function level2() {
          return Q.Promise(function (res: Function, rej: Function) {
            setTimeout(function () {
              rej(new Error("test error for stack trace"));
            }, 0);
          });
        }

        level1().then(
          () => resolve("fulfilled"),
          (err: Error) => {
            resolve(err.stack || "");
          }
        );
      });

      // With the original code, object_defineProperty correctly sets the stack
      // property on the error, so the stack should contain "From previous event:"
      // indicating that makeStackTraceLong successfully concatenated stacks.
      // With the mutated code, object_defineProperty does nothing (empty function),
      // so the stack won't be modified and won't contain the separator.
      expect(result).toContain("From previous event:");
    } finally {
      Q.longStackSupport = false;
    }
  });
});