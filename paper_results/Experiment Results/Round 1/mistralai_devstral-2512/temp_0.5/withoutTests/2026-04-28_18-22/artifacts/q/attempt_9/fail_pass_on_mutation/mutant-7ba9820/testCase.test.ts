const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.ninvoke", () => {
  it("should return a promise that can be chained and resolves with the method result", () => {
    const obj = {
      method: (callback: (err: Error | null, result?: number) => void) => {
        callback(null, 42);
      }
    };

    return Q.ninvoke(obj, "method")
      .then((result: number) => {
        expect(result).toBe(42);
        return result * 2;
      })
      .then((doubled: number) => {
        expect(doubled).toBe(84);
      });
  });
});