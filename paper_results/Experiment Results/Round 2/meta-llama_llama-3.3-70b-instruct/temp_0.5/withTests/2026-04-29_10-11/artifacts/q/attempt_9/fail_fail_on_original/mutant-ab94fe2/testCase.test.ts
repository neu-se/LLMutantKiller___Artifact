import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('q', () => {
  it('should test the behavior of the mutated file', () => {
    const promise = Q.reject(new Error('Test error'));

    Q.onerror = jest.fn();

    promise.done(() => {
      throw new Error('Test error');
    }, () => {
      throw new Error('Test error');
    });

    expect(Q.onerror).toHaveBeenCalledTimes(1);
  });
});