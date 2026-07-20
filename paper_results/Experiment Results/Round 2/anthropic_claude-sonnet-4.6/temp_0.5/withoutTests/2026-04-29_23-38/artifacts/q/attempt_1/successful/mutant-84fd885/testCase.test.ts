import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.ninvoke", () => {
  it("should pass arguments to the named method when using ninvoke", async () => {
    const obj = {
      add: function (a: number, b: number, callback: (err: null, result: number) => void) {
        callback(null, a + b);
      }
    };

    const result = await Q.ninvoke(obj, "add", 3, 4);
    expect(result).toBe(7);
  });
});