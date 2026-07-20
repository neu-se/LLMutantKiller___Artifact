import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should not resolve with an array of values when all promises are fulfilled in the mutated code', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).not.toEqual([1, 2, 3]);
        });
    });
});