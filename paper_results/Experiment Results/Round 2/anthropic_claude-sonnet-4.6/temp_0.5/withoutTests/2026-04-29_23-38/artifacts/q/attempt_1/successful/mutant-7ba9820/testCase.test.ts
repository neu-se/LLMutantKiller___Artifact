import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.ninvoke", () => {
  it("should invoke a named method on the promised object and return a promise with the result", async () => {
    const obj = {
      add: function (a: number, b: number, callback: (err: null, result: number) => void) {
        callback(null, a + b);
      }
    };

    const promise = Q(obj);
    const result = await promise.ninvoke("add", 3, 4);
    expect(result).toBe(7);
  });
});