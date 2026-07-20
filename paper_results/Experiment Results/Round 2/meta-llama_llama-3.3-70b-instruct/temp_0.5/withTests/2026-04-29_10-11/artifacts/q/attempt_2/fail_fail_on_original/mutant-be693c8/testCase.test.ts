import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject with a timeout error if the promise is too slow', () => {
        var deferred = Q.defer();
        var promise = Q.timeout(deferred.promise, 10);

        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error.code).toBe('ETIMEDOUT');
            }
        );
    });
});