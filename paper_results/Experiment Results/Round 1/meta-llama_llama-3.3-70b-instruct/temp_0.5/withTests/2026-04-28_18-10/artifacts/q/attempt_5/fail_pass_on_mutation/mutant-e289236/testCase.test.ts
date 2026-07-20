import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        promise.then((value) => {
            expect(value).toBeUndefined();
        });

        deferred.resolve();
        expect(deferred.resolve()).toBeUndefined();
    });
});