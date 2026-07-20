import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are fulfilled and the promise is not already fulfilled', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q((resolve, reject) => {
            setTimeout(() => {
                resolve(3);
            }, 10);
        });

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});