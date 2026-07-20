import { Q } from "../q.js";

describe('Q', () => {
    it('should map an array correctly', () => {
        const arr = [1, 2, 3];
        const mappedArr = Q(arr).map((value: number): number => value * 2);
        return mappedArr.then((result: number[]) => {
            expect(result.length).toBe(3);
            expect(result[0]).toBe(2);
            expect(result[1]).toBe(4);
            expect(result[2]).toBe(6);
        });
    });
});