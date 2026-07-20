import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should resolve with the correct value when using spread', () => {
        const promise = Q([1, 2, 3]);
        const result = promise.spread((a, b, c) => a + b + c);
        return result.then((value) => {
            expect(value).toBe(6);
        });
    });
});