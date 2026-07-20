const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should distinguish between null and non-null method names", () => {
    const obj = {
      method: function() {
        return "called with method";
      }
    };

    const promise = Q(obj);
    const nullResult = promise.post(null, []);
    const methodResult = promise.post("method", []);

    return Promise.all([
      nullResult.then((result: any) => {
        expect(result).toBeUndefined();
      }),
      methodResult.then((result: any) => {
        expect(result).toBe("called with method");
      })
    ]);
  });
});