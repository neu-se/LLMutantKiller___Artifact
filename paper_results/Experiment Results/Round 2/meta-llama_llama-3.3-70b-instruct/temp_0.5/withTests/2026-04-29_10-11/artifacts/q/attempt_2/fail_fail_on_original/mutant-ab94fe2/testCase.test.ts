import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('q', () => {
  it('should test the behavior of the mutated file', () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error('Test error');

    Q.onerror = jest.fn();

    promise.then(void 0, (error) => {
      throw error;
    });

    deferred.reject(error);

    // This test case relies on the fact that in the original code, 
    // Q.onerror is called when an error is thrown in a promise chain.
    // In the mutated code, Q.onerror is not called because the 
    // onUnhandledError function in the done method is empty.
    expect(Q.onerror).toHaveBeenCalledTimes(1);
  });
});