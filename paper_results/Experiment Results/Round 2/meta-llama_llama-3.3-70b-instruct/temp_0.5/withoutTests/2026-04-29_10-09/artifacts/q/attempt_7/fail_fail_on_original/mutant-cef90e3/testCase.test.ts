import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject a promise when done is true', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const done = true;
        const exception = new Error('Test error');

        promise.then(null, (error: Error) => {
            if (!done) {
                throw error;
            }
        });

        deferred.reject(exception);
    });
});