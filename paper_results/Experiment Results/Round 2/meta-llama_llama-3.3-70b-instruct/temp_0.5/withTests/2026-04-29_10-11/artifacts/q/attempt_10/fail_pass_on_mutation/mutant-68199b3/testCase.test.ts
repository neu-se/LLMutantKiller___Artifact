import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise dispatch', function () {
    it('should pass on the original code and fail on the mutated code', function () {
        var object = {
            test: function () {
                return 'test';
            }
        };
        var promise = Q(object);
        var methodName = 'test';
        var result = promise.dispatch(methodName, []);
        expect(result).not.toBeUndefined();
    });
});