import { Q } from "./q.js";

describe('Q Promise', () => {
    it('should resolve with the correct value when using spread', () => {
        const promise = Q([1, 2, 3]);
        const result = promise.spread((a: number, b: number, c: number) => {
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
            return a + b + c;
        });
        return expect(result).resolves.toBe(6);
    });
});