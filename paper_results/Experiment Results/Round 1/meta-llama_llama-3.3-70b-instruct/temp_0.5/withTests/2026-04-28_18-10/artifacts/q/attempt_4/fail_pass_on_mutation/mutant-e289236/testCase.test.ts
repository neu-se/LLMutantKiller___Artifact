import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        deferred.resolve(10);

        promise.then((value) => {
            expect(value).toBe(10);
        }, (error) => {
            expect(error).toBeUndefined();
        });

        expect(deferred.resolve()).toBeUndefined();
    });
});