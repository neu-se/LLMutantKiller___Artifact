import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.all', () => {
    it('should behave differently for fulfilled and rejected promises', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject(2);

        return Q.all([promise1, promise2]).then((values) => {
            expect(values).not.toEqual([1, 2]);
        }).catch((error) => {
            expect(error).toBe(2);
        });
    });
});