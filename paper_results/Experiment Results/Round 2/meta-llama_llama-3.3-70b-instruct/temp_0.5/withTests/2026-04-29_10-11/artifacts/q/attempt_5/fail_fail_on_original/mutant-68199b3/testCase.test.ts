import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise dispatch', function () {
    it('should dispatch with the correct method name', function () {
        var object = {
            test: function () {
                return 'test';
            }
        };
        var promise = Q(object);
        return promise.dispatch('test', []).then(function (value) {
            expect(value).toBe('test');
        });
    });

    it('should not dispatch with an empty method name', function () {
        var object = {
            test: function () {
                return 'test';
            }
        };
        var promise = Q(object);
        var result = promise.dispatch('', []);
        expect(result).toBeUndefined();
    });
});