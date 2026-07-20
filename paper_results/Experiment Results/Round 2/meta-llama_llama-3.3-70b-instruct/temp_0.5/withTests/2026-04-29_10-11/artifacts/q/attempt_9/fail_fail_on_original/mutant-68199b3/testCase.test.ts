import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise dispatch', function () {
    it('should check the method name when dispatching', function () {
        var object = {
            test: function () {
                return 'test';
            }
        };
        var promise = Q(object);
        var methodName = 'test';
        return promise.dispatch(methodName, []).then(function (value) {
            expect(value).toBe('test');
        });
    });
});