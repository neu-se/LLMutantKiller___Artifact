import { Q } from '../../q';

describe('Q', () => {
    it('should work correctly with array_indexOf', () => {
        const array = [1, 2, 3, 4, 5];
        expect(Q.indexOf(array, 3)).toBe(2);
        expect(Q.indexOf(array, 6)).toBe(-1);
        const arrayReverse = [5, 4, 3, 2, 1];
        expect(Q.indexOf(arrayReverse, 3)).toBe(2);
    });
});