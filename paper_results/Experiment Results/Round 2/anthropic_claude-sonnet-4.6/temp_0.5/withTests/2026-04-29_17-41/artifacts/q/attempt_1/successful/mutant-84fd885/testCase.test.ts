import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.ninvoke", () => {
  it("should pass arguments to the node-style method when using Q.ninvoke", async () => {
    const obj = {
      method: function (a: number, b: number, c: number, callback: (err: null, result: number) => void) {
        callback(null, a + b + c);
      }
    };

    const result = await Q.ninvoke(obj, "method", 1, 2, 3);
    expect(result).toEqual(6);
  });
});