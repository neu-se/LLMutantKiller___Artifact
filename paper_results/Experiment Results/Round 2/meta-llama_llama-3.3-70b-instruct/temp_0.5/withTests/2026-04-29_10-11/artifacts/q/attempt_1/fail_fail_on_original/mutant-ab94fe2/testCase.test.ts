import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('q', () => {
  it('should test the behavior of the mutated file', () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    const error = new Error('Test error');
    const onUnhandledError = jest.fn();

    Q.onerror = onUnhandledError;

    promise.then(void 0, (error) => {
      throw error;
    });

    deferred.reject(error);

    expect(onUnhandledError).toHaveBeenCalledTimes(1);
    expect(onUnhandledError).toHaveBeenCalledWith(error);
  });
});