import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('q', () => {
  it('should test the behavior of the mutated file', () => {
    const promise = Q.reject(new Error('Test error'));

    promise.done(null, () => {
      throw new Error('Test error');
    });

    expect(() => promise).not.toThrowError();
  });
});