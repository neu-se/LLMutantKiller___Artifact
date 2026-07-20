describe('Q', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const Q = require('../../../../../../../../subject_repositories/q/q.js');
    const promise = Q.resolve();
    const func = jest.fn();
    expect(() => promise.fcall(func, 1, 2, 3)).not.toThrowError();
  });
});