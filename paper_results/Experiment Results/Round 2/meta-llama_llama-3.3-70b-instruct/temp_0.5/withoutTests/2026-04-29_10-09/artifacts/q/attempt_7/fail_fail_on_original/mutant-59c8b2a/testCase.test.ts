import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should test the behavior of valueOf function in promise', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve(Q(10));
        const value = promise.valueOf();
        expect(typeof value).toBe('number');
    });
});