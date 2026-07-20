import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.defer', () => {
    it('should resolve with a single value when arguments.length is exactly 2', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1);
        return deferred.promise.then((value) => {
            expect(value).toBe(1);
        });
    });

    it('should not resolve with an array when arguments.length is exactly 2', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1);
        return deferred.promise.then((value) => {
            expect(Array.isArray(value)).toBe(false);
        });
    });
});