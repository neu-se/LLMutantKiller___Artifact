import { Q } from "../../../q.js";

describe('Q promise', () => {
    it('should resolve a promise only once', (done) => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let count = 0;

        promise.then(() => {
            count++;
            if (count > 1) {
                done(new Error('Promise resolved more than once'));
            } else {
                done();
            }
        });

        deferred.resolve();
        deferred.resolve();
    });
});