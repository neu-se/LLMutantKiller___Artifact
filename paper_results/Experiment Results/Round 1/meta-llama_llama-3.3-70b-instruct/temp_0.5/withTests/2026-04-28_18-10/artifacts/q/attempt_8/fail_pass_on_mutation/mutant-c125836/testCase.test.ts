import { Q } from '../../../../../../../../subject_repositories/q/q.js';

describe('Q', () => {
    it('should handle array_reduce correctly', () => {
        const array = [1, 2, 3];
        const basis = 10;
        const callback = (acc: any, current: any) => acc + current;
        const result = array.reduce(callback, basis);
        expect(result).toBe(16);
        const emptyArray: any[] = [];
        expect(() => emptyArray.reduce(callback)).toThrowError();
    });
});