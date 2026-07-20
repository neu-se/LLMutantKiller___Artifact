import { Q } from "../../../../../q";

describe('Q', () => {
    it('should return an object with a state property when calling inspect on a pending promise', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.inspect()).toEqual({ state: "pending" });
    });
});