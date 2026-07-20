import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.join', () => {
    it('should throw an error when comparing two different values in the mutated code', async () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        await expect(Q.join(promise1, promise2)).rejects.toThrowError();
    });
});