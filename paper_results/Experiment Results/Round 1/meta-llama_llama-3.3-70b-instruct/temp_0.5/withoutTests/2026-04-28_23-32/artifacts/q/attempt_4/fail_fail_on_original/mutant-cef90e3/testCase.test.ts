import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should call the then callback once when resolved twice', (done) => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let called = 0;

        promise.then(() => {
            called++;
            expect(called).toBe(1);
            done();
        });

        deferred.resolve();
        deferred.resolve();
    });
});