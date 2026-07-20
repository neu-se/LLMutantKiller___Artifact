import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should test the Q.race function', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.reject('error');

        return Q.race([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe(1);
        });
    });
});