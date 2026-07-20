import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should apply the function with the given arguments', async () => {
        const func = (a, b) => a + b;
        const promise = q.Q.fapply(func, [1, 2]);
        await expect(promise).resolves.toBe(3);
    });
});