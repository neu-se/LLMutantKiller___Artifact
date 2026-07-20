import { Q } from "../../../../../../../../../../../subject_repositories/q/q";
import { array_map } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle array_map correctly', () => {
        const array = [1, 2, 3];
        const mappedArray = Q(array).then((arr: number[]) => {
            return array_map(arr, (element: number) => element * 2);
        });
        return mappedArray.then((result: number[]) => {
            expect(result).toEqual([2, 4, 6]);
        });
    });
});