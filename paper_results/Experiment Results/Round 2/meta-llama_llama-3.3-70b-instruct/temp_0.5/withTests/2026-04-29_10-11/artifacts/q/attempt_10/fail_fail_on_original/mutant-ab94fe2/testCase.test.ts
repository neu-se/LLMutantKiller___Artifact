import { Q } from '../../../q.js';

describe('q', () => {
  it('should test the behavior of the mutated file', () => {
    const error = new Error('Test error');
    const promise = Q.reject(error);

    promise.done(null, () => {
      throw error;
    });

    expect(() => promise).not.toThrowError();
  });
});