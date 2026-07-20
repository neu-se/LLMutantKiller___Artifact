import { Q } from "../q.js";

describe('Q', () => {
    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = Q(arr);
        return promise.then((array: any[]) => {
            let found = false;
            array.forEach((element) => {
                if (element === 3) {
                    found = true;
                }
            });
            expect(found).toBe(true);
            expect(array.indexOf(3)).toBe(2);
        });
    });
});