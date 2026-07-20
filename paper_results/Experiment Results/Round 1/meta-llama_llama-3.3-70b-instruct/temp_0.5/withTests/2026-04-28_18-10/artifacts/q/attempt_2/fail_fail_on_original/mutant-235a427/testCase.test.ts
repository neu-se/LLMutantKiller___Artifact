import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the promised function with arguments', () => {
        var sum = function (a: any, b: any) {
            return a + b;
        };
        var promisedSum = Q.promised(sum);
        return promisedSum(Q(1), Q(2)).then(function (result: any) {
            expect(result).toBe(3);
        });
    });
});