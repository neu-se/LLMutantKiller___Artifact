const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.ninvoke", () => {
  it("should invoke method and return a promise that resolves with callback result", () => {
    const obj = {
      testMethod: (a: number, b: number, callback: (err: Error | null, result?: number) => void) => {
        callback(null, a * b);
      }
    };

    return Q.ninvoke(obj, "testMethod", 3, 4).then((result: number) => {
      expect(result).toBe(12);
    });
  });
});