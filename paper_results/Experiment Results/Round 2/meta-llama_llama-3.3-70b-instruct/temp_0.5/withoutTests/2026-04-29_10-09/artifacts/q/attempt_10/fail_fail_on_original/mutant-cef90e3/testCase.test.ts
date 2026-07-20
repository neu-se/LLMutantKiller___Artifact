import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject a promise when done is true', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const done = true;
        const exception = new Error('Test error');

        promise.then(() => {
            throw new Error('This should not be reached');
        }, (error: Error) => {
            if (done) {
                expect(error).toBe(exception);
            } else {
                throw error;
            }
        });

        deferred.reject(exception);
    });
});