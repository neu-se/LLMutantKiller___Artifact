import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.fapply', () => {
    it('should apply the function with the given arguments', () => {
        const func = jest.fn((a, b) => a + b);
        const result = Q.fapply(func, [1, 2]);
        result.then((value) => {
            expect(value).toBe(3);
        });
    });
});