import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise rejection', async () => {
        const error = new Error();
        const p = Q.reject(error);
        await expect(p).rejects.toThrow(error);
    });
});