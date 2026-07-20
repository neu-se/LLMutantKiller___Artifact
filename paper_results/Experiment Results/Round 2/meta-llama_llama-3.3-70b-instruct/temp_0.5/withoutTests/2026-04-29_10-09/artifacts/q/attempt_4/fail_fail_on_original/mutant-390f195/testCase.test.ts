import { Q } from "./q.js";

describe('Q', () => {
    it('should correctly set the minimum stack counter', async () => {
        const error = new Error();
        const p = Q.reject(error);
        p.catch(() => {});
        try {
            throw new Error();
        } catch (e: any) {
            expect(Object.prototype.hasOwnProperty.call(e, '__minimumStackCounter__')).toBe(true);
        }
    });
});