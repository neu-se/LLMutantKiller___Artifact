import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle promise rejection correctly', async () => {
        const promise = Q.reject('error');
        try {
            await promise;
            throw new Error('Promise should have been rejected');
        } catch (error: any) {
            expect(error).toBe('error');
        }
    });
});