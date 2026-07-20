const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.post", () => {
  it("should resolve with the result of calling the method with the given name and arguments", async () => {
    const obj = {
      testMethod: (a: number, b: number) => a + b
    };
    const promise = Q(obj);
    const result = await promise.post("testMethod", [2, 3]);
    expect(result).toBe(5);
  });
});