import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle array_map correctly', () => {
        const array = [1, 2, 3];
        const mappedArray = Q.fcall(function() {
            return array_map(array, function(element: number): number {
                return element * 2;
            });
        });
        return mappedArray.then(function(result: number[]) {
            expect(result).toEqual([2, 4, 6]);
        });
    });
});