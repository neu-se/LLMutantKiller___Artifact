import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('reduce function', () => {
    it('should reduce an array correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (basis: number, value: number) => basis + value;
        const expected = 15;

        return Q(array).then((arr: number[]) => {
            const result = arr.reduce(callback, 0);
            expect(result).toBe(expected);
        });
    });
});