import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('q', () => {
  it('should test the behavior of the mutated file', () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error('Test error');

    Q.onerror = jest.fn();

    promise.done(null, null, null);

    deferred.reject(error);

    expect(Q.onerror).toHaveBeenCalledTimes(1);
  });
});