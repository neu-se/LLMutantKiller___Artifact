import { Q } from "../q.js";

describe('Q', () => {
    it('should find an element in an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const promise = Q(arr);
        return promise.then((array: any[]) => {
            let found = false;
            array.forEach((element, index) => {
                if (element === 3) {
                    found = true;
                    expect(index).toBe(2);
                }
            });
            expect(found).toBe(true);
        });
    });
});