import { Q, array_indexOf } from './q';

describe('Q', () => {
    it('should work correctly with array_indexOf', () => {
        const array = [1, 2, 3, 4, 5];
        expect(array_indexOf(array, 3)).toBe(2);
        expect(array_indexOf(array, 6)).toBe(-1);
    });
});