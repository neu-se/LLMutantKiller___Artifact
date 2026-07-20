describe("Q", () => {
  it("should return true for a fulfilled promise", () => {
    const Q = require('./q');
    const promise = Q.resolve(true);
    expect(promise.isFulfilled()).toBe(true);
  });
});