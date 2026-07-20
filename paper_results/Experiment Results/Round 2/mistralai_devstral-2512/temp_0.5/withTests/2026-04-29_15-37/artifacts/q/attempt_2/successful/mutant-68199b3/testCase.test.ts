const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.fcall", () => {
  it("should correctly invoke a function with arguments", async () => {
    const testFn = jest.fn((a: number, b: number, c: number) => a + b + c);
    const promise = Q(testFn);
    const result = await promise.fcall(1, 2, 3);
    expect(result).toBe(6);
    expect(testFn).toHaveBeenCalledWith(1, 2, 3);
  });
});