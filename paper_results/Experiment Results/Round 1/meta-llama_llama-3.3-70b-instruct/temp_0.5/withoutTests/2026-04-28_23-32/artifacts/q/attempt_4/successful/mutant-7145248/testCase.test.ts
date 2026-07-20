import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q.defer', () => {
    it('should resolve with the values when no error and multiple values are passed to the node resolver', () => {
        const deferred = q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 'value1', 'value2');
        return deferred.promise.then((value: any) => {
            expect(Array.isArray(value)).toBe(true);
        });
    });
});