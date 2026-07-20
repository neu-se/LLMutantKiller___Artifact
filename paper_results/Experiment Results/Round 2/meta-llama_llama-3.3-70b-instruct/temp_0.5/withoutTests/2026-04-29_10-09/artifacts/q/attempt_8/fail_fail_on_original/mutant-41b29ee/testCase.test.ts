import { Q } from "./q.js";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are fulfilled', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
            return Q.all([promise1, promise2, promise3]);
        }).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});