import { Q } from './q.js';

describe('Q', () => {
    it('should work correctly with array_indexOf', () => {
        const array = [1, 2, 3, 4, 5];
        const indexOfThree = Q.indexOf(array, 3);
        expect(indexOfThree).toBe(2);
        const indexOfSix = Q.indexOf(array, 6);
        expect(indexOfSix).toBe(-1);
    });
});