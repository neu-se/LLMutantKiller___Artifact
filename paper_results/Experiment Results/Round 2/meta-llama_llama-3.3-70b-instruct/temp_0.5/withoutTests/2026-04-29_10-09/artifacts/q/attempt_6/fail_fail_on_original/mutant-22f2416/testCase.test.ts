import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.defer', () => {
    it('should resolve with a single value when arguments.length is 2', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1);
        return deferred.promise.then((value) => {
            expect(value).toBe(1);
        });
    });

    it('should resolve with an array when arguments.length is greater than 2', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1, 2, 3);
        return deferred.promise.then((value) => {
            expect(Array.isArray(value)).toBe(true);
            expect(value).toEqual([1, 2, 3]);
        });
    });
});