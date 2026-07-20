const q = require('./q');

describe("Q", () => {
  it("should return true for a fulfilled promise", () => {
    const promise = q.resolve(true);
    expect(promise.isFulfilled()).toBe(true);
  });
});