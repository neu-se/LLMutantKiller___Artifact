import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should resolve a promise only once', (done) => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let resolved = false;

        promise.then(() => {
            if (resolved) {
                done(new Error('Promise resolved more than once'));
            } else {
                resolved = true;
                done();
            }
        });

        deferred.resolve();
        deferred.resolve();
    });
});