import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should resolve with the correct value when using spread with fulfilled', () => {
        const promise = Q([1, 2, 3]);
        const result = promise.spread((a, b, c) => {
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });
        return result;
    });
});