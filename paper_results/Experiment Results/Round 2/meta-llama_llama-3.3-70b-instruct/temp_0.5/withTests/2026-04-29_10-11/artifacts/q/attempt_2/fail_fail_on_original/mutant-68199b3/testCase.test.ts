import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function', function () {
    it('should result in a fulfilled promise when given a value', function () {
        var promise = Q(5);
        return promise.then(function (value) {
            expect(value).toBe(5);
        });
    });

    it('should be the identity when given promise', function () {
        var f = Q(5);
        return Q(f).then(function (value) {
            expect(value).toBe(5);
        });
    });

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
});