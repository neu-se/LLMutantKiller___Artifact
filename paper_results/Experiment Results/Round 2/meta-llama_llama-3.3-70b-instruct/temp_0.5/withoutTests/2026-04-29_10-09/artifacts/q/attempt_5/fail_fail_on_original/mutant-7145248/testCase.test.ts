import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.defer', () => {
    it('should resolve with the correct value when multiple arguments are passed to the resolver', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 'arg1', 'arg2', 'arg3');
        return deferred.promise.then((value) => {
            expect(value).not.toBeNull();
        });
    });
});