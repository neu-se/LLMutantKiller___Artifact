import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.fapply', function () {
    it('should apply a function with arguments', function () {
        var func = function (a: any, b: any, c: any) {
            return a + b + c;
        };
        return Q.fapply(Q(func), [1, 2, 3]).then(function (sum: any) {
            expect(sum).toBe(6);
        });
    });

    it('should apply a function with no arguments', function () {
        var func = function () {
            return 42;
        };
        return Q.fapply(Q(func), []).then(function (result: any) {
            expect(result).toBe(42);
        });
    });

    it('should reject if the function throws an error', function () {
        var func = function () {
            throw new Error('Test error');
        };
        return Q.fapply(Q(func), []).then(function () {
            expect(true).toBe(false);
        }, function (error: any) {
            expect(error.message).toBe('Test error');
        });
    });

    it('should pass arguments to the function', function () {
        var func = function (a: any, b: any, c: any) {
            return [a, b, c];
        };
        return Q.fapply(Q(func), [1, 2, 3]).then(function (args: any) {
            expect(args).toEqual([1, 2, 3]);
        });
    });
});