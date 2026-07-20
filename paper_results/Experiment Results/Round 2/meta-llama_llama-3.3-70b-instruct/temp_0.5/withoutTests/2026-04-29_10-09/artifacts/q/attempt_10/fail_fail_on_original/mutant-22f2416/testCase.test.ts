import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.defer', () => {
    it('should resolve with a single value when arguments.length is 2 and not resolve with an array when arguments.length is greater than 2', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1, 2);
        return deferred.promise.then((value) => {
            expect(Array.isArray(value)).toBe(false);
        });
    });
});