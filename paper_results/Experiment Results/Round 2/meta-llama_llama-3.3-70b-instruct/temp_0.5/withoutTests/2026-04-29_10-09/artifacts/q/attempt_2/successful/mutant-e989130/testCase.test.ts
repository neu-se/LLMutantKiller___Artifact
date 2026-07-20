import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should inspect pending promise', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.inspect().state).toBe('pending');
    });
});