const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.tap", () => {
  it("should return a promise when called with a promise and callback", async () => {
    const promise = Q.resolve(42);
    const callback = jest.fn();
    const result = Q.tap(promise, callback);
    expect(typeof result.then).toBe('function');
    await result;
    expect(callback).toHaveBeenCalledWith(42);
  });
});