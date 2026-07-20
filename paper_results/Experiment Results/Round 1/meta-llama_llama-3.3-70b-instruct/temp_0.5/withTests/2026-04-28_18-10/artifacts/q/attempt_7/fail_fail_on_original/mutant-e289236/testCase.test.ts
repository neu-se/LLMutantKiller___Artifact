import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        let called = false;

        promise.then((value) => {
            called = true;
        });

        expect(called).toBe(false);

        deferred.resolve();

        expect(called).toBe(false);

        Q.nextTick(() => {
            expect(called).toBe(true);
        });
    });
});