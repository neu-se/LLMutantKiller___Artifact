import { Q } from '../../../q.js';

describe('q', () => {
  it('should test the behavior of the mutated file', () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error('Test error');

    Q.onerror = jest.fn();

    promise.done(() => {
      throw error;
    });

    expect(() => deferred.resolve()).toThrowError(error);
  });
});