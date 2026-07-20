const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.ninvoke", () => {
  it("should invoke a method with arguments and return a promise for the result", async () => {
    const obj = {
      method: function(a: number, b: number, callback: (err: any, result: number) => void) {
        callback(null, a + b);
      }
    };

    const result = await Q(obj).ninvoke("method", 2, 3);
    expect(result).toBe(5);
  });
});