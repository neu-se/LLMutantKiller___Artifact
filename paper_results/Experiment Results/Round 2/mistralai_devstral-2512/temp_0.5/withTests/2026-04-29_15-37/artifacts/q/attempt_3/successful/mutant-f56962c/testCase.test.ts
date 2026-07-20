const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.fcall", () => {
  it("should fulfill a promise by applying arguments to a function", async () => {
    const testFn = (a: number, b: number, c: number) => a + b + c;
    const promise = Q(testFn);
    const result = await promise.fcall(1, 2, 3);
    expect(result).toBe(6);
  });
});