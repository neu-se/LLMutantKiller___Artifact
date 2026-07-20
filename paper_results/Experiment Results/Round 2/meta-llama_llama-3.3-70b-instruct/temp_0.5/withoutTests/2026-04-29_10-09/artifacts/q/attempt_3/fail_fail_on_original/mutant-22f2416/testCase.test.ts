import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.defer', () => {
    it('should resolve with a value when arguments.length is exactly 2 in the original code but fail in the mutated code', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1, 2);
        return deferred.promise.then((value) => {
            expect(Array.isArray(value)).toBe(false);
        });
    });
});