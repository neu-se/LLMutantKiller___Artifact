import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.defer', () => {
    it('should resolve with an array of values when multiple arguments are passed to the resolver', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 'arg1', 'arg2', 'arg3');
        return deferred.promise.then((value) => {
            expect(Array.isArray(value)).toBe(true);
        });
    });
});