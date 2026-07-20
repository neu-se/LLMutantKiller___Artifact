import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('Q', () => {
    it('should work correctly with array_indexOf', () => {
        const array = [1, 2, 3, 4, 5];
        const indexOfThree = Q(array).indexOf(3);
        expect(indexOfThree).toBe(2);
        const indexOfSix = Q(array).indexOf(6);
        expect(indexOfSix).toBe(-1);
    });
});