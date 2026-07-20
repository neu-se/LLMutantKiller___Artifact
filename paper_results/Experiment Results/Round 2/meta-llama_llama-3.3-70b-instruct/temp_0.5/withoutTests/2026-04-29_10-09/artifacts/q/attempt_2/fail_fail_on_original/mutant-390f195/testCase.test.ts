import { Q } from "./q.js";

describe('Q', () => {
    it('should correctly set the minimum stack counter', async () => {
        const error = new Error();
        const p = Q.reject(error);
        p.catch(() => {});
        try {
            throw new Error();
        } catch (e) {
            expect(e.__minimumStackCounter__).toBeDefined();
        }
    });
});