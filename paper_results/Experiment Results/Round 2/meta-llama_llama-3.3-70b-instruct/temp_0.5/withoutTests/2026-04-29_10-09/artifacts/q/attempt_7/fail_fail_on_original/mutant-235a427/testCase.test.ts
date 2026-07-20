describe('Q', () => {
    it('should return a promise that resolves with the correct value when using Q.promised', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const callback = Q.promised(function (self: any, args: any[]) {
            return self + args[0] + args[1];
        });
        return expect(callback(1, 2, 3)).resolves.toBe(6);
    });
});