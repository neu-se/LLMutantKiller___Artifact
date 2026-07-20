import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should apply a function with arguments', () => {
        const object = function(arg1: number, arg2: number) {
            return arg1 + arg2;
        };

        const result = Q(object).fapply([1, 2]);

        return result.then((value: number) => {
            expect(value).toBe(3);
        });
    });
});