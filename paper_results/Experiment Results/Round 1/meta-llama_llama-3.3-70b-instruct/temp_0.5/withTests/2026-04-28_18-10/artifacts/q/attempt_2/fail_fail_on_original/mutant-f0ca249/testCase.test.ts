import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array reduce correctly', () => {
        var array = [1, 2, 3];
        var sum = Q(array).then((arr: number[]) => {
            return arr.reduce((a: number, b: number) => {
                return a + b;
            }, 0);
        });
        return sum.then((result: number) => {
            expect(result).toBe(6);
        });
    });
});