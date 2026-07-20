import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should apply the function with the given arguments', async () => {
        const func = (a: number, b: number) => a + b;
        const promise = q.fapply(func, [1, 2]);
        await expect(promise).resolves.toBe(3);
    });
});