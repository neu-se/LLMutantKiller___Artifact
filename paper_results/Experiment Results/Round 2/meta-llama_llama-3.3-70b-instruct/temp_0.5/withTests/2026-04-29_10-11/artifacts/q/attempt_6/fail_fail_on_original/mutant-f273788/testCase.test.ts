import { Q } from "../../../q.js";

describe('Q.fapply', function () {
    it('should apply a function with arguments and pass them correctly', function () {
        var func = function (a: any, b: any, c: any) {
            return [a, b, c];
        };
        return Q.fapply(Q(func), [1, 2, 3]).then(function (args: any) {
            expect(args).toEqual([1, 2, 3]);
        });
    });

    it('should fail when the mutated code is used', function () {
        var func = function (a: any, b: any, c: any) {
            return [a, b, c];
        };
        return Q.fapply(Q(func), []).then(function (args: any) {
            expect(true).toBe(false);
        }, function (error: any) {
            expect(error).not.toBeUndefined();
        });
    });
});