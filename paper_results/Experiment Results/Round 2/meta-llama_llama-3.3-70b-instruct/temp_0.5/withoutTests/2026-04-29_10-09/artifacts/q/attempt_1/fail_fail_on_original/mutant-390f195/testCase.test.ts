import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly set the minimum stack counter', async () => {
        const error = new Error();
        const p = Q.reject(error);
        p.catch(() => {});
        expect(error.__minimumStackCounter__).toBeGreaterThan(0);
    });
});