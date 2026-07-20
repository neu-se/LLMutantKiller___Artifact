const q = require('./q.js');

describe("Q", () => {
  it("should return true for a fulfilled promise", () => {
    const promise = q.resolve(true);
    expect(promise.isFulfilled()).toBeTruthy();
    const promise2 = q.resolve(false);
    expect(promise2.isFulfilled()).toBeTruthy();
  });
});