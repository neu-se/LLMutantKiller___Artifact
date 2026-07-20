import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.fapply', () => {
    it('should apply the function with the given arguments', () => {
        const func = jest.fn((a, b) => a + b);
        const promise = Q(func);
        const result = promise.fapply([1, 2]);
        result.then((value) => {
            expect(value).toBe(3);
        });
    });
});