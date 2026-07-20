import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.join', () => {
    it('should reject when two promises resolve to different values', async () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        await expect(Q.join(promise1, promise2)).rejects.toThrowError();
    });
});