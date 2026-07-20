import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.ninvoke", () => {
  it("should invoke a node-style method on a promised object and resolve with the result", async () => {
    const obj = {
      method: function (a: number, b: number, callback: (err: null, result: number) => void) {
        callback(null, a + b);
      }
    };

    const result = await Q(obj).ninvoke("method", 1, 2);
    expect(result).toEqual(3);
  });
});