describe('Q.fapply', function () {
    it('should apply a function with arguments and pass them correctly', function () {
        var Q = require('../../../../../q.js');
        var func = function (a: any, b: any, c: any) {
            return [a, b, c];
        };
        return Q.fapply(Q(func), [1, 2, 3]).then(function (args: any) {
            expect(args).toEqual([1, 2, 3]);
        });
    });
});