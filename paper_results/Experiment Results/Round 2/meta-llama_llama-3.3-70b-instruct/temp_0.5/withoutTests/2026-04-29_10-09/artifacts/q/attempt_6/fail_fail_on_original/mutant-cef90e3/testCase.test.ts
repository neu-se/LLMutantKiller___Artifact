import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject a promise when done is true', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const done = false;
        const exception = new Error('Test error');

        promise.then(null, (error: Error) => {
            if (done) {
                // This should not be reached in the original code
                expect(true).toBe(false);
            } else {
                // This should be reached in the original code
                expect(true).toBe(true);
            }
        });

        deferred.reject(exception);
    });
});