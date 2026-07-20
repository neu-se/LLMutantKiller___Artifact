import { Q } from './q';

describe('Q', () => {
    it('should work correctly with array_indexOf', () => {
        const array = [1, 2, 3, 4, 5];
        var result = Q(array_indexOf)(array, 3);
        expect(result).toBe(2);
        const array2 = [1, 2, 3, 4, 5];
        var result2 = Q(array_indexOf)(array2, 6);
        expect(result2).toBe(-1);
    });
});