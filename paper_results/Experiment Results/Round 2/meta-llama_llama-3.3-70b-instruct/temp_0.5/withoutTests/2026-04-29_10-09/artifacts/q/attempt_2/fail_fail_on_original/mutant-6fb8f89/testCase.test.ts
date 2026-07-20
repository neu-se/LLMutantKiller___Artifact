import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should resolve with the correct value when using spread', () => {
        const promise = Q([1, 2, 3]);
        const result = promise.spread((a: any, b: any, c: any) => a + b + c);
        return result.then((value: any) => {
            expect(value).toBe(6);
        });
    });
});