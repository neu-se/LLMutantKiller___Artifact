import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise dispatch', function () {
    it('should throw an error when dispatching with an empty method name on the original code but not on the mutated code', function () {
        var object = {
            test: function () {
                return 'test';
            }
        };
        var promise = Q(object);
        return promise.dispatch('', []).then(function (value) {
            expect(true).toBe(false);
        }, function (error) {
            expect(true).toBe(true);
        });
    });
});