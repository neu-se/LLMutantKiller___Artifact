import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should test the behavior of the mutated file', (done) => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        let called = false;

        promise.then((value) => {
            called = true;
        });

        expect(called).toBe(false);

        Q.nextTick(() => {
            deferred.resolve();
        });

        Q.nextTick(() => {
            expect(called).toBe(true);
            done();
        });
    });
});