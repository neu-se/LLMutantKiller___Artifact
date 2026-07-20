describe("Q", () => {
  it("should return true for a fulfilled promise", () => {
    const Q = require('../../../../../../../../subject_repositories/q/q.js');
    const promise = Q(true);
    expect(promise.isFulfilled()).toBe(true);
  });
});