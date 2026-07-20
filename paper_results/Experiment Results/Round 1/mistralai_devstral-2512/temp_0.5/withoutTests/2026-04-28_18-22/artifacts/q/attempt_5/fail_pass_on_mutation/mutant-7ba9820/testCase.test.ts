const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.ninvoke", () => {
  it("should properly handle method invocation and return a promise", () => {
    const obj = {
      method: (arg1: string, arg2: string, callback: (err: Error | null, result?: string) => void) => {
        callback(null, arg1 + arg2);
      }
    };

    return Q.ninvoke(obj, "method", "foo", "bar").then((result: string) => {
      expect(result).toBe("foobar");
    });
  });
});