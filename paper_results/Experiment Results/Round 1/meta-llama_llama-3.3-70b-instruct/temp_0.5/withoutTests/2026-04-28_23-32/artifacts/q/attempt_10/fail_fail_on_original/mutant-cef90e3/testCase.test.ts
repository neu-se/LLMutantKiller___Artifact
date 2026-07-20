import { Q } from "../../q.js";

describe('Q promise', () => {
    it('should not call the then callback twice when resolved twice', (done) => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let called = false;

        promise.then(() => {
            if (called) {
                done(new Error('Then callback called twice'));
            } else {
                called = true;
                done();
            }
        });

        deferred.resolve();
        deferred.resolve();
    });
});