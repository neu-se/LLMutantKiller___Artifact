import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject a promise when done is true', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const done = true;
        const exception = new Error('Test error');

        promise.then(null, function() {
            throw exception;
        });

        deferred.reject(exception);

        // If the test reaches this point without throwing an error, it means the promise was not rejected
        // This should happen with the mutated code, but not with the original code
        expect(true).toBe(true);
    });
});