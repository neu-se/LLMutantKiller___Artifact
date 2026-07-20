import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const deferred = Q.defer();
        const promise = deferred.promise.then(
            function (value) {
                return value;
            },
            function (exception) {
                return exception;
            },
            function (progress) {
                throw new Error('Test error');
            }
        );

        deferred.notify('progress');
        deferred.resolve('value');

        return promise.then(
            function (value) {
                expect(value).toBe('value');
            },
            function (exception) {
                expect(exception).toBe('Test error');
            }
        );
    });
});