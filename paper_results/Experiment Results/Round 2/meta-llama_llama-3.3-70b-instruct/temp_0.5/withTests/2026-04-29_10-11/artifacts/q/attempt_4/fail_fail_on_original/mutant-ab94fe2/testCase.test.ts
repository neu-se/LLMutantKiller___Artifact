import { Q } from '../../../q.js';

describe('q', () => {
  it('should test the behavior of the mutated file', () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error('Test error');

    Q.onerror = jest.fn();

    promise.then(void 0, (e: any) => {
      throw e;
    });

    deferred.reject(error);

    expect(Q.onerror).toHaveBeenCalledTimes(0);
    // Add a small delay to ensure the error is thrown in the next tick
    return Q.delay(10).then(() => {
      expect(Q.onerror).toHaveBeenCalledTimes(1);
    });
  });
});