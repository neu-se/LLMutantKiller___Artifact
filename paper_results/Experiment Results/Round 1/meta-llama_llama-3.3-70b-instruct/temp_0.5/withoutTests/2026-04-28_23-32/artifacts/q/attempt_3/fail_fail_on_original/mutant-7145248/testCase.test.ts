import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q.defer', () => {
    it('should resolve with the values when error and multiple values are passed to the node resolver', () => {
        const deferred = q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver('error', 'value1', 'value2');
        return deferred.promise.then((value) => {
            expect(value).toEqual('error');
        });
    });
});