import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have allSettled method', () => {
        expect(Q.allSettled).toBeDefined();
    });

    it('should call allSettled method without error', async () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        const result = Q.allSettled(promises);
        await expect(result).resolves.toHaveLength(3);
    });
});