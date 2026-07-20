import { Q } from "../../../q.js";

describe('Q', () => {
    it('should map an array correctly', () => {
        const arr = [1, 2, 3];
        const mappedArr = Q(arr).map((value) => value * 2);
        return mappedArr.then((result) => {
            expect(result).toEqual([2, 4, 6]);
        });
    });
});