const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.ninvoke mutation test", () => {
  it("should pass arguments to the method when using ninvoke", async () => {
    const testObject = {
      method: function(a: number, b: number, callback: (err: any, result?: number) => void) {
        callback(null, a + b);
      }
    };

    const result = await Q.ninvoke(testObject, "method", 2, 3);
    expect(result).toBe(5);
  });
});