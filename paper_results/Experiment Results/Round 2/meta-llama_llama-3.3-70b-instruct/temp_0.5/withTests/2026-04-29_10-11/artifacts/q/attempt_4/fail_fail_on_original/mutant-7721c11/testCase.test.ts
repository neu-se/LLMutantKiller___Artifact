import { Q } from "./q.js"; // Import Q from the correct location

describe('Q', () => {
    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = Q(arr);
        return promise.then((array: any[]) => {
            const indexOfThree = array.indexOf(3);
            expect(indexOfThree).toBeGreaterThan(-1);
        });
    });

    it('should return -1 when the element is not found in the array', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = Q(arr);
        return promise.then((array: any[]) => {
            const indexOfSix = array.indexOf(6);
            expect(indexOfSix).toBe(-1);
        });
    });
});