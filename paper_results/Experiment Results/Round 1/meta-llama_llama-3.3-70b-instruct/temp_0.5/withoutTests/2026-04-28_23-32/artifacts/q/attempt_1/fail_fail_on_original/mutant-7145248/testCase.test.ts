import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.defer', () => {
    it('should resolve with the first argument when error and multiple values are passed to the node resolver', () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver('error', 'value1', 'value2');
        return deferred.promise.then((value) => {
            expect(value).toEqual(['value1', 'value2']);
        });
    });
});