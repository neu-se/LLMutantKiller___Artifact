import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should reject when resolved twice with an error in the second resolution', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let error = null;

        promise.then(() => {
            throw new Error('Test error');
        }, (err) => {
            error = err;
        });

        deferred.resolve();
        deferred.resolve();

        expect(error).toBeInstanceOf(Error);
    });
});