import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise dispatch', function () {
    it('should throw an error when dispatching with an empty method name on the original code but fail on the mutated code', function () {
        var object = {
            test: function () {
                return 'test';
            }
        };
        var promise = Q(object);
        return promise.dispatch('test', []).then(function (value) {
            expect(value).toBe('test');
            var result = promise.dispatch('', []);
            expect(result).toBeUndefined();
        });
    });
});