import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.defer', () => {
    it('should resolve with the first argument when multiple arguments are passed to the resolver and arguments length is less than or equal to 2', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 'arg1', 'arg2');
        return deferred.promise.then((value) => {
            expect(value).toBe('arg1');
        });
    });
});