import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should not call the then callback twice when resolved twice', (done) => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let called = 0;

        promise.then(() => {
            called++;
            if (called > 1) {
                done(new Error('Then callback called more than once'));
            } else {
                done();
            }
        });

        deferred.resolve();
        deferred.resolve();
    });
});