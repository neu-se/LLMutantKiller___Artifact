import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should test the Q.race function with an array of promises', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        return Q.race([promise1, promise2, promise3]).then((value) => {
            expect(value).toBeLessThan(3);
        });
    });
});