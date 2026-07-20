import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are fulfilled', async () => {
        const promise1 = q.Q(1);
        const promise2 = q.Q(2);
        const promise3 = q.Q(3);

        const result = await q.Q.all([promise1, promise2, promise3]);
        expect(result).toEqual([1, 2, 3]);
    });
});