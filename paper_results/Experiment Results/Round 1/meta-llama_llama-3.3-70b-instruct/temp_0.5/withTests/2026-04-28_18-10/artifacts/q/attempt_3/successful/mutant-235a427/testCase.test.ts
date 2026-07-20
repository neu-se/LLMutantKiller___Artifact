import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the promised function with arguments', () => {
        var sum = function (a: any, b: any) {
            return a + b;
        };
        var callback = Q.promised(function (self, args) {
            return sum.apply(self, args);
        });
        return callback(Q, [1, 2]).then(function (result: any) {
            expect(result).toBe(3);
        });
    });
});