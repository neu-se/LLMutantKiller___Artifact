import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should test the behavior of the mutated file', (done) => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        let called = false;

        promise.then(() => {
            called = true;
        }, () => {
            expect(true).toBe(false);
        });

        expect(called).toBe(false);

        deferred.reject();

        setTimeout(() => {
            expect(called).toBe(false);
            done();
        }, 10);
    });
});