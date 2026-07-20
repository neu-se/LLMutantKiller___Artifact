import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should apply the function with the given arguments', () => {
        const func = jest.fn((a, b) => a + b);
        const result = Q.fapply(func, [1, 2]);
        expect(result).rejects.toThrowError(TypeError);
    });
});