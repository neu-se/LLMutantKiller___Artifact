import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should not call the then callback twice when resolved twice', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let called = 0;

        promise.then(() => {
            called++;
        });

        deferred.resolve();
        deferred.resolve();

        expect(called).toBe(1);
    });
});