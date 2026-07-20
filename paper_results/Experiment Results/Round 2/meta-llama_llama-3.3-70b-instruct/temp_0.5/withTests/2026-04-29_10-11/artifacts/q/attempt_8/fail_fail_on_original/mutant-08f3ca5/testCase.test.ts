import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const deferred = Q.defer();
        const promise = deferred.promise.then(
            function (value) {
                return value;
            },
            function (exception) {
                throw exception;
            }
        );

        deferred.reject('error');

        return promise.catch(
            function (exception) {
                expect(exception).toBe('error');
            }
        );
    });
});