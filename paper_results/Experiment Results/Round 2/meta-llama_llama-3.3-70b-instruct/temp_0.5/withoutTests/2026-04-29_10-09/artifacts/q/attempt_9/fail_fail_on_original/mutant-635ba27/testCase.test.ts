import { Q } from '../../../q';

describe('Q', () => {
    it('should work correctly with array_indexOf', () => {
        const array = [1, 2, 3, 4, 5];
        const indexOfThree = Q.indexOf(array, 3);
        expect(indexOfThree).toBe(2);
        const indexOfSix = Q.indexOf(array, 6);
        expect(indexOfSix).toBe(-1);
        const arrayReverse = [5, 4, 3, 2, 1];
        const indexOfThreeInReverse = Q.indexOf(arrayReverse, 3);
        expect(indexOfThreeInReverse).toBe(2);
    });
});