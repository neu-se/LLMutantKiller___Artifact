const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.ninvoke", () => {
  it("should return a promise when invoking a method", () => {
    const obj = {
      method: (callback: (err: Error | null, result?: string) => void) => {
        callback(null, "success");
      }
    };

    const result = Q.ninvoke(obj, "method");
    expect(result).toBeInstanceOf(Q.Promise);
    return result.then((value: string) => {
      expect(value).toBe("success");
    });
  });
});