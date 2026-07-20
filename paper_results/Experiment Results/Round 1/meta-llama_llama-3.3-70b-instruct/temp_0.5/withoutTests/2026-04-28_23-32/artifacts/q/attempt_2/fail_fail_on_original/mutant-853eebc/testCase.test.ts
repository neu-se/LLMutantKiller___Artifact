import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should map an array correctly', () => {
        const arr = [1, 2, 3];
        const mappedArr = Q(arr).map(function(value) {
            return value * 2;
        });
        expect(Q.isFulfilled(mappedArr)).toBe(true);
        return mappedArr.then((result) => {
            expect(result).toEqual([2, 4, 6]);
        });
    });
});