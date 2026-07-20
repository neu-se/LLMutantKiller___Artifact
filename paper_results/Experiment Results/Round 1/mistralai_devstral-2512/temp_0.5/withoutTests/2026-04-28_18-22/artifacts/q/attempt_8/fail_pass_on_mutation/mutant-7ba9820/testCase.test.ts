const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.ninvoke", () => {
  it("should properly handle method invocation with multiple arguments and return a promise", () => {
    const obj = {
      method: (a: string, b: string, c: string, callback: (err: Error | null, result?: string) => void) => {
        callback(null, a + b + c);
      }
    };

    return Q.ninvoke(obj, "method", "a", "b", "c").then((result: string) => {
      expect(result).toBe("abc");
    });
  });
});