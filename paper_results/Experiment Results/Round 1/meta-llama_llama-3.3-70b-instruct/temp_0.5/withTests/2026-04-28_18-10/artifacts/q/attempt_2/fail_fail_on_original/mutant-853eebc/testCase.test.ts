import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should map array elements correctly', () => {
        const array = [1, 2, 3];
        const mappedArray = Q(array).then((arr) => arr.map((element: number) => element * 2));
        return mappedArray.then((result) => {
            expect(result).toEqual([2, 4, 6]);
        });
    });
});