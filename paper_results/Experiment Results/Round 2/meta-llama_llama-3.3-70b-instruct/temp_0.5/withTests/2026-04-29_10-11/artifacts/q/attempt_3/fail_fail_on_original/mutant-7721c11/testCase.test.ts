import { Q } from "./q.js"; // Import Q from the correct location

describe('Q', () => {
    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = Q(arr);
        return promise.then((array: any[]) => {
            expect(array.indexOf(3)).toBe(2);
        });
    });

    it('should return -1 when the element is not found in the array', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = Q(arr);
        return promise.then((array: any[]) => {
            expect(array.indexOf(6)).toBe(-1);
        });
    });
});