const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.ninvoke", () => {
  it("should return a promise that resolves with the method's result", () => {
    const obj = {
      testMethod: (a: number, b: number, callback: (err: Error | null, result?: number) => void) => {
        callback(null, a + b);
      }
    };

    return Q.ninvoke(obj, "testMethod", 2, 3).then((result: number) => {
      expect(result).toBe(5);
    });
  });
});