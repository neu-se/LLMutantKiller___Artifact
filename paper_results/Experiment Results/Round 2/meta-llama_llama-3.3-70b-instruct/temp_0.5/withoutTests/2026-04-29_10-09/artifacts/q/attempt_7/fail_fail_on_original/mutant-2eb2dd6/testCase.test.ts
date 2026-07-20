import { array_reduce } from './q.js';

describe('Q', () => {
    it('should correctly reduce an array', () => {
        const array = [1, 2, 3, 4, 5];
        const callback = (basis: number, value: number, index: number) => basis + value;
        const result = array_reduce(array, callback, 0);
        expect(result).toBe(15);
    });
});