import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject a promise when done is true', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const done = true;
        const exception = new Error('Test error');

        promise.then(null, (error: Error) => {
            if (done) {
                // This should throw an error in the original code
                // But not in the mutated code
                expect(true).toBe(false);
            } else {
                throw error;
            }
        });

        deferred.reject(exception);
    });
});