const q = require('./q');

describe('q', () => {
  it('should create a promise', () => {
    const promise = q(10);
    expect(promise.isFulfilled()).toBe(true);
  });
});