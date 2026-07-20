import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.join', () => {
    it('should return a value when two promises resolve to the same value', async () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(1);
        const result = await Q.join(promise1, promise2);
        expect(result).toBe(1);
    });
});