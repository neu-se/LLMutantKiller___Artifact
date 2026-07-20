const q = require('../../../../../../../../../subject_repositories/q/q.js');

describe('q', () => {
  it('should create a promise', () => {
    const promise = q(10);
    expect(promise.isFulfilled()).toBe(true);
  });
});