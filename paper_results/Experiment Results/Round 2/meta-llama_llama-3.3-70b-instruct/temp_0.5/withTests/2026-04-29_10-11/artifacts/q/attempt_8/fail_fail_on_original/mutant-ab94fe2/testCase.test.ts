import { Q } from '../../../q.js';

describe('q', () => {
  it('should test the behavior of the mutated file', () => {
    const promise = Q.reject(new Error('Test error'));

    Q.onerror = jest.fn();

    promise.done();

    expect(Q.onerror).toHaveBeenCalledTimes(1);
  });
});