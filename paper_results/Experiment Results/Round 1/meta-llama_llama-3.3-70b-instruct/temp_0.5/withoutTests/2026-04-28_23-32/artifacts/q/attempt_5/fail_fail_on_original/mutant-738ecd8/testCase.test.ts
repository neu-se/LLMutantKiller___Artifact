import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.join', () => {
    it('should not throw an error when comparing two equal values', async () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(1);
        await expect(Q.join(promise1, promise2)).resolves.not.toThrow();
    });
});