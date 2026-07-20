import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return an object with a state property when calling inspect on a pending promise', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected).not.toBeNull();
        expect(typeof inspected).toBe('object');
        expect('state' in inspected).toBe(true);
    });
});