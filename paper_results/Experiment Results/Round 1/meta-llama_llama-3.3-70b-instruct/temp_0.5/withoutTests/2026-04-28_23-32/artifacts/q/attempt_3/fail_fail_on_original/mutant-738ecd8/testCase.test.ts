import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.join', () => {
    it('should reject with an error if the two promises do not resolve to the same value', async () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        await expect(Q.join(promise1, promise2)).rejects.toThrowError("Q can't join: not the same: 1 2");
    });
});