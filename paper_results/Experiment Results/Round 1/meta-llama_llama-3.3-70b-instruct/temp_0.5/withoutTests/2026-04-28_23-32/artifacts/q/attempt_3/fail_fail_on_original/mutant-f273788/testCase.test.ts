import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.fapply', () => {
    it('should apply the function with the given arguments', async () => {
        const func = jest.fn((a, b) => a + b);
        const promise = Q.fapply(func, [1, 2]);
        await expect(promise).resolves.toBe(3);
    });
});