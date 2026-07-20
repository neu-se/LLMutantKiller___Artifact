import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.fapply', function () {
    it('should apply a function with arguments', function () {
        var func = function (a, b, c) {
            return a + b + c;
        };
        return Q.fapply(Q(func), [1, 2, 3]).then(function (sum) {
            expect(sum).toBe(6);
        });
    });

    it('should apply a function with no arguments', function () {
        var func = function () {
            return 42;
        };
        return Q.fapply(Q(func), []).then(function (result) {
            expect(result).toBe(42);
        });
    });

    it('should reject if the function throws an error', function () {
        var func = function () {
            throw new Error('Test error');
        };
        return Q.fapply(Q(func), []).then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe('Test error');
        });
    });
});