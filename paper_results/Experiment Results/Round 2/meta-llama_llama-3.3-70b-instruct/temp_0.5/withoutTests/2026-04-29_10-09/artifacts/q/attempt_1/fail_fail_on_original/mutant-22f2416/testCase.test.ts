import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.defer', () => {
    it('should resolve with an array when arguments.length > 2', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1, 2, 3);
        return deferred.promise.then((value) => {
            expect(value).toEqual([1, 2, 3]);
        });
    });
});