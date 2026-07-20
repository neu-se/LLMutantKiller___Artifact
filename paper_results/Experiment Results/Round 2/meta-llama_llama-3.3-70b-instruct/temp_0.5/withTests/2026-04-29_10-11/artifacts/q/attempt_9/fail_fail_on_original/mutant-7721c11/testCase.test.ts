import { Q } from "./q.js";

describe('Q', () => {
    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = Q(arr);
        return promise.then((array: any[]) => {
            expect(array.indexOf(3)).toBe(2);
        });
    });
});