import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should resolve with the first fulfilled promise', () => {
        const promise1 = Q.delay(10);
        const promise2 = Q.delay(5);
        const promise3 = Q.reject('error');

        return Q.race([promise1, promise2, promise3]).then((value) => {
            expect(value).toBeUndefined();
        });
    });
});