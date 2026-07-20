import { Q } from '../../../q';

describe('reduce function', () => {
    it('should reduce an array correctly', () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (basis: number, value: number) => basis + value;
        const expected = 15;

        const promise = Q(array_reduce(array, callback, 0));
        return promise.then((result: number) => {
            expect(result).toBe(expected);
        });
    });
});